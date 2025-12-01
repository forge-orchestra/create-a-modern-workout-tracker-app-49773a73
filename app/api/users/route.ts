import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, User } from '@prisma/client';
import { z } from 'zod';
import Cors from 'cors';

const prisma = new PrismaClient();

const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

type UserRequest = {
  name: string;
  email: string;
  password: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  switch (req.method) {
    case 'GET':
      try {
        const users: User[] = await prisma.user.findMany();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
      }
      break;

    case 'POST':
      try {
        const result = userSchema.safeParse(req.body);
        if (!result.success) {
          return res.status(400).json({ error: 'Invalid input' });
        }

        const { name, email, password }: UserRequest = result.data;
        const newUser: User = await prisma.user.create({
          data: { name, email, password },
        });
        res.status(201).json(newUser);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
      }
      break;

    case 'PUT':
      try {
        const { id } = req.query;
        const result = userSchema.safeParse(req.body);
        if (!result.success) {
          return res.status(400).json({ error: 'Invalid input' });
        }

        const { name, email, password }: UserRequest = result.data;
        const updatedUser: User = await prisma.user.update({
          where: { id: Number(id) },
          data: { name, email, password },
        });
        res.status(200).json(updatedUser);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        await prisma.user.delete({
          where: { id: Number(id) },
        });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
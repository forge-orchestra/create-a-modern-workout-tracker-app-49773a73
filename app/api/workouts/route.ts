import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import Cors from 'cors';
import { z } from 'zod';

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: '*',
});

// Helper method to run middleware
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

// Define types for request and response
type Workout = {
  id: string;
  name: string;
  exercises: string[];
  duration: number;
};

type ErrorResponse = {
  message: string;
};

// Input validation schemas
const workoutSchema = z.object({
  name: z.string().min(1),
  exercises: z.array(z.string()).nonempty(),
  duration: z.number().positive(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<Workout | Workout[] | ErrorResponse>) {
  await runMiddleware(req, res, cors);

  switch (req.method) {
    case 'GET':
      try {
        const workouts = await prisma.workout.findMany();
        res.status(200).json(workouts);
      } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
      break;

    case 'POST':
      try {
        const parsedBody = workoutSchema.parse(req.body);
        const newWorkout = await prisma.workout.create({
          data: parsedBody,
        });
        res.status(201).json(newWorkout);
      } catch (error) {
        if (error instanceof z.ZodError) {
          res.status(400).json({ message: 'Invalid input' });
        } else {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      }
      break;

    case 'PUT':
      try {
        const { id, ...data } = workoutSchema.extend({ id: z.string() }).parse(req.body);
        const updatedWorkout = await prisma.workout.update({
          where: { id },
          data,
        });
        res.status(200).json(updatedWorkout);
      } catch (error) {
        if (error instanceof z.ZodError) {
          res.status(400).json({ message: 'Invalid input' });
        } else {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      }
      break;

    case 'DELETE':
      try {
        const { id } = z.object({ id: z.string() }).parse(req.query);
        await prisma.workout.delete({
          where: { id },
        });
        res.status(204).end();
      } catch (error) {
        if (error instanceof z.ZodError) {
          res.status(400).json({ message: 'Invalid input' });
        } else {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
import { ReactNode } from 'react';

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Exercise {
  id: string;
  name: string;
  sets: Set[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Set {
  id: string;
  reps: number;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  workouts: Workout[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Progress {
  id: string;
  userId: string;
  workoutId: string;
  date: Date;
  notes: string;
}

export interface AppProps {
  children: ReactNode;
}

export interface IconProps {
  size?: number;
  color?: string;
}
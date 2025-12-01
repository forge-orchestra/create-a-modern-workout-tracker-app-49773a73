import { LucideIcon } from 'lucide-react';

/**
 * Type representing a workout plan.
 */
export type WorkoutPlan = {
  id: string;
  name: string;
  exercises: Exercise[];
};

/**
 * Type representing an exercise.
 */
export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
};

/**
 * Type representing user progress.
 */
export type Progress = {
  date: string;
  workoutId: string;
  completedExercises: CompletedExercise[];
};

/**
 * Type representing a completed exercise.
 */
export type CompletedExercise = {
  exerciseId: string;
  setsCompleted: number;
  repsCompleted: number;
};

/**
 * Fetches workout plans for a user.
 * @param userId - The ID of the user.
 * @returns A promise that resolves to an array of WorkoutPlan.
 */
export async function fetchWorkoutPlans(userId: string): Promise<WorkoutPlan[]> {
  try {
    const response = await fetch(`/api/workout-plans?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch workout plans');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching workout plans:', error);
    throw error;
  }
}

/**
 * Logs user progress for a workout.
 * @param progress - The progress data to log.
 * @returns A promise that resolves when the progress is logged.
 */
export async function logProgress(progress: Progress): Promise<void> {
  try {
    const response = await fetch('/api/log-progress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(progress),
    });
    if (!response.ok) {
      throw new Error('Failed to log progress');
    }
  } catch (error) {
    console.error('Error logging progress:', error);
    throw error;
  }
}

/**
 * Calculates the total sets and reps completed for a workout.
 * @param completedExercises - Array of completed exercises.
 * @returns An object containing total sets and reps.
 */
export function calculateTotalSetsAndReps(completedExercises: CompletedExercise[]): { totalSets: number; totalReps: number } {
  return completedExercises.reduce(
    (totals, exercise) => {
      totals.totalSets += exercise.setsCompleted;
      totals.totalReps += exercise.repsCompleted;
      return totals;
    },
    { totalSets: 0, totalReps: 0 }
  );
}

/**
 * Renders an icon using Lucide React.
 * @param iconName - The name of the icon to render.
 * @returns The LucideIcon component.
 */
export function renderIcon(iconName: string): LucideIcon {
  try {
    const IconComponent = require(`lucide-react/${iconName}`).default;
    return <IconComponent />;
  } catch (error) {
    console.error('Error rendering icon:', error);
    throw error;
  }
}

export { fetchWorkoutPlans, logProgress, calculateTotalSetsAndReps, renderIcon };
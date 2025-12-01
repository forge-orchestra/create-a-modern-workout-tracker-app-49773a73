import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Workout } from '@/types';
import { format } from 'date-fns';

interface WorkoutCardProps {
  workout: Workout;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 transition-transform transform hover:scale-105">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">{workout.name}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(workout.id)}
            aria-label="Edit workout"
            className="text-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            <LucideIcon name="edit" size={20} />
          </button>
          <button
            onClick={() => onDelete(workout.id)}
            aria-label="Delete workout"
            className="text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
          >
            <LucideIcon name="trash" size={20} />
          </button>
        </div>
      </div>
      <p className="text-gray-600 mt-2">{workout.description}</p>
      <div className="mt-4">
        <span className="text-sm text-gray-500">Date: {format(new Date(workout.date), 'PPP')}</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {workout.exercises.map((exercise) => (
          <span
            key={exercise.id}
            className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded"
          >
            {exercise.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WorkoutCard;
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Workout } from '@/types';
import { fetchWorkouts } from '@/api/workouts';
import { Loader, AlertCircle } from 'lucide-react';

const WorkoutPage: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await fetchWorkouts();
        setWorkouts(data);
      } catch (err) {
        setError('Failed to load workouts');
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 flex items-center">
          <AlertCircle className="w-6 h-6 mr-2" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Workouts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:bg-gray-100"
            onClick={() => router.push(`/workouts/${workout.id}`)}
          >
            <h2 className="text-xl font-semibold">{workout.name}</h2>
            <p className="text-gray-600">{workout.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPage;
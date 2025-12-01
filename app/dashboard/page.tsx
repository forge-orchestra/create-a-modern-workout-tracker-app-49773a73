"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { getWorkoutSummaries, getUserProgress } from '@/lib/api';
import { WorkoutSummary, UserProgress } from '@/types';
import { Loader, AlertCircle } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [workoutSummaries, setWorkoutSummaries] = useState<WorkoutSummary[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaries, progress] = await Promise.all([
          getWorkoutSummaries(),
          getUserProgress(),
        ]);
        setWorkoutSummaries(summaries);
        setUserProgress(progress);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-gray-500" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 flex items-center">
          <AlertCircle size={24} className="mr-2" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workoutSummaries.map((summary) => (
          <div key={summary.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold">{summary.title}</h2>
            <p className="text-gray-600">{summary.description}</p>
            <button
              className="mt-2 text-blue-500 hover:underline"
              onClick={() => router.push(`/workout/${summary.id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
      {userProgress && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Your Progress</h2>
          <p className="text-gray-600">Total Workouts: {userProgress.totalWorkouts}</p>
          <p className="text-gray-600">Total Hours: {userProgress.totalHours}</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
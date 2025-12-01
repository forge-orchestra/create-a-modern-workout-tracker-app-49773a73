'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { User, Settings } from 'lucide-react';
import { getUserProfile, updateUserProfile } from '@/lib/api';
import { UserProfile } from '@/types';
import { ErrorBoundary } from 'react-error-boundary';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch (err) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async (updatedProfile: UserProfile) => {
    try {
      await updateUserProfile(updatedProfile);
      setProfile(updatedProfile);
    } catch (err) {
      setError('Failed to update profile.');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <ErrorBoundary FallbackComponent={() => <div className="text-red-500">Something went wrong.</div>}>
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center mb-4">
          <User className="w-8 h-8 mr-2" />
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
        {profile && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center mb-4">
              <img src={profile.avatar} alt="Avatar" className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h2 className="text-xl font-semibold">{profile.name}</h2>
                <p className="text-gray-600">{profile.email}</p>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => router.push('/settings')}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <Settings className="w-5 h-5 mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default ProfilePage;
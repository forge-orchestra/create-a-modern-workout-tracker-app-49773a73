"use client";

import { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, CheckCircle, Loader } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import "tailwindcss/tailwind.css";

const HeroSection: FC = () => (
  <div className="bg-gray-900 text-white py-20">
    <div className="container mx-auto px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Forge App</h1>
      <p className="text-lg md:text-xl mb-8">
        Track and manage your fitness routines effortlessly.
      </p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Get Started
      </button>
    </div>
  </div>
);

const FeatureShowcase: FC = () => (
  <div className="bg-white py-20">
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="text-center">
        <CheckCircle className="mx-auto text-blue-600 w-12 h-12 mb-4" />
        <h2 className="text-xl font-bold mb-2">Personalized Plans</h2>
        <p>Customized workout plans tailored to your goals.</p>
      </div>
      <div className="text-center">
        <CheckCircle className="mx-auto text-blue-600 w-12 h-12 mb-4" />
        <h2 className="text-xl font-bold mb-2">Progress Tracking</h2>
        <p>Monitor your progress with detailed analytics.</p>
      </div>
      <div className="text-center">
        <CheckCircle className="mx-auto text-blue-600 w-12 h-12 mb-4" />
        <h2 className="text-xl font-bold mb-2">Social Sharing</h2>
        <p>Share your achievements with friends and family.</p>
      </div>
    </div>
  </div>
);

const Loading: FC = () => (
  <div className="flex justify-center items-center h-screen">
    <Loader className="animate-spin text-blue-600 w-12 h-12" />
  </div>
);

const ErrorFallback: FC<{ error: Error }> = ({ error }) => (
  <div className="flex justify-center items-center h-screen text-red-600">
    <AlertTriangle className="w-12 h-12 mr-2" />
    <span>Something went wrong: {error.message}</span>
  </div>
);

const Page: FC = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div>
        <HeroSection />
        <FeatureShowcase />
      </div>
    </ErrorBoundary>
  );
};

export default Page;
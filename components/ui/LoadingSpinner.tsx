import React from 'react';
import { Loader } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  ariaLabel?: string;
}

const sizeClasses = {
  small: 'w-4 h-4',
  medium: 'w-8 h-8',
  large: 'w-12 h-12',
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = 'text-gray-500',
  ariaLabel = 'Loading',
}) => {
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`flex justify-center items-center ${sizeClasses[size]}`}
    >
      <Loader className={`animate-spin ${color}`} />
    </div>
  );
};

export default LoadingSpinner;
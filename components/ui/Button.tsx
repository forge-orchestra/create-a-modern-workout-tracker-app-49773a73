import React from 'react';
import { LucideIcon } from 'lucide-react';
import classNames from 'classnames';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
  icon?: LucideIcon;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  icon: Icon,
  children,
  type = 'button',
  ariaLabel,
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    tertiary: 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
  };
  const sizeStyles = {
    small: 'px-2.5 py-1.5 text-xs',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classNames(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        { 'opacity-50 cursor-not-allowed': disabled }
      )}
    >
      {Icon && <Icon className="mr-2" />}
      {children}
    </button>
  );
};

export default Button;
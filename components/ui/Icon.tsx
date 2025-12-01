import { FC } from 'react';
import { LucideIcon, IconProps } from 'lucide-react';
import clsx from 'clsx';

interface IconComponentProps extends IconProps {
  icon: LucideIcon;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
}

const sizeClasses = {
  small: 'w-4 h-4',
  medium: 'w-6 h-6',
  large: 'w-8 h-8',
};

const Icon: FC<IconComponentProps> = ({ icon: IconElement, size = 'medium', className, 'aria-label': ariaLabel, ...props }) => {
  return (
    <span
      role="img"
      aria-label={ariaLabel}
      className={clsx('inline-flex items-center justify-center', sizeClasses[size], className)}
    >
      <IconElement {...props} />
    </span>
  );
};

export default Icon;
import React from 'react';
import { IconProps } from './BrowserIcon';

export const FlagIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = 'currentColor', 
  className = '' 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 27 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M 0 3.75 L 0 6 C 0 6.83 0.67 7.5 1.5 7.5 L 4.5 7.5 L 4.5 3.75 C 4.5 2.508 3.492 1.5 2.25 1.5 C 1.008 1.5 0 2.508 0 3.75 Z M 5.25 1.5 C 5.719 2.128 6 2.906 6 3.75 L 6 18 C 6 19.655 7.345 21 9 21 C 10.655 21 12 19.655 12 18 L 12 17.752 C 12 16.233 13.233 15 14.752 15 L 22.5 15 L 22.5 6 C 22.5 3.516 20.484 1.5 18 1.5 Z M 21.75 22.5 C 24.652 22.5 27 20.152 27 17.25 C 27 16.837 26.662 16.5 26.25 16.5 L 14.752 16.5 C 14.063 16.5 13.5 17.058 13.5 17.752 L 13.5 18 C 13.5 20.484 11.484 22.5 9 22.5 Z"
        fill={color}
      />
    </svg>
  );
};
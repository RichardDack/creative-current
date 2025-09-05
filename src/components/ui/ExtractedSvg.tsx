'use client';
import React, { useState } from 'react';

interface ExtractedSvgProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  showText?: boolean;
  animated?: boolean;
}

export const ExtractedSvg: React.FC<ExtractedSvgProps> = ({
  width = 200,
  height = 100,
  className = '',
  style = {},
  showText = false,
  animated = true,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`inline-flex flex-col items-center ${className}`}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 180 100"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Creative Current Logo"
        className="overflow-visible"
      >
        {/* Top part - slides in from top on hover */}
        <g 
          className={animated ? `transition-transform duration-500 ease-out ${
            isHovered ? 'translate-y-0' : '-translate-y-8'
          }` : ''}
          style={{ 
            opacity: animated ? (isHovered ? 1 : 0) : 1,
            transition: animated ? 'opacity 0.5s ease-out, transform 0.5s ease-out' : 'none'
          }}
        >
          <path
            d="M1162.09 668.4c191.27 0 357.11 105.44 444.86 261.87-11.4 12.29-22.82 24.59-35.09 36.92-49.15 43.03-107.96 95.78-193.04 102.83-82.5 7.02-155.32-37.82-228.13-83.49-74.58-45.7-149.17-92.31-232.51-69.46-11.42 3.54-23.69-3.48-26.33-14.93-3.51-11.4 3.51-23.72 14.9-26.33 101.78-28.13 184.25 22.82 266.72 74.67 66.7 41.32 133.39 82.59 208.84 73.83 63.15-7.92 121.09-54.49 170.22-97.56-82.47-128.32-227.26-213.55-390.46-213.55-243.9 0-443.96 188.06-464.14 427.11 46.51-33.41 125.48-89.67 128.11-91.41 137.74-94.89 243.03-29 348.32 36.05 71.94 44.81 151.81 94.02 233.38 73.8 79.83-19.34 143.02-75.57 200.06-132.7 29.84-27.23 50.89 3.54 27.2 27.23-11.39 11.46-67.56 62.41-77.22 69.46-43.88 35.15-96.51 66.76-152.68 79.08-93.86 19.34-173.7-29.9-253.56-79.98-87.72-54.46-176.37-108.98-285.17-46.57-32.45 18.44-116.66 79.08-170.21 118.64l-16.65 12.33-18.44 14.03-7.89 5.28c-.87-14.93-1.77-30.77-1.77-45.7 0-282.98 228.16-511.43 510.66-511.43z"
            fill="#31afb4"
            fillRule="evenodd"
            transform="translate(-58.183 -59.7) scale(.08932)"
            style={{
              fillOpacity: 1,
              strokeWidth: 0
            }}
          />
        </g>

        {/* Bottom part - slides in from bottom on hover */}
        <g 
          className={animated ? `transition-transform duration-500 ease-out ${
            isHovered ? 'translate-y-0' : 'translate-y-8'
          }` : ''}
          style={{ 
            opacity: animated ? (isHovered ? 1 : 0) : 1,
            transition: animated ? 'opacity 0.5s ease-out, transform 0.5s ease-out' : 'none'
          }}
        >
          <path
            d="M1162.09 1690.43c-191.27 0-357.95-105.47-445.7-261.03 11.4-13.16 22.79-25.49 35.09-36.89 49.12-43.96 107.9-96.68 193.01-103.7 83.37-7.02 155.31 37.79 228.16 83.49 74.55 46.54 149.14 92.25 232.47 69.4 11.43-2.64 23.69 3.54 26.33 14.93 3.51 11.46-3.51 23.75-14.9 26.39-101.78 28.13-184.25-22.85-266.75-74.7-66.67-41.29-133.33-82.62-208.78-72.93-63.19 7.05-121.09 53.59-170.22 96.66 83.34 128.29 227.23 213.55 391.3 213.55 243.93 0 443.96-188.06 463.27-427.07-46.48 33.38-125.47 89.6-128.11 91.38-137.74 94.92-243.03 29-348.29-36.02-71.97-44.84-150.93-94.05-233.4-73.83-79.86 20.21-143.89 76.47-200.93 133.57-22.82 25.49-54.4-3.51-19.28-35.15 22.79-21.08 46.48-43.07 70.17-62.38 43.88-35.15 96.5-66.81 152.67-79.11 93.9-19.31 173.73 29.87 253.56 79.98 87.75 54.49 176.37 108.95 285.14 46.57 32.48-18.47 116.72-79.11 170.22-118.64l16.68-12.3 18.44-14.06 7.89-5.28c.9 14.96 1.74 30.77 1.74 46.57 0 282.08-228.1 510.59-509.75 510.59z"
            fill="#babdc6"
            fillRule="evenodd"
            transform="translate(-60.707 -101.221) scale(.08932)"
            style={{
              fillOpacity: 1,
              strokeWidth: 0
            }}
          />
        </g>

        {/* Home text - always visible when not animated */}
        {!animated && (
          <text
            x="90"
            y="55"
            textAnchor="middle"
            className="fill-gray-600 text-sm font-medium"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            HOME
          </text>
        )}
      </svg>

      {/* Creative Current text - appears after hover animation */}
      {showText && (
        <div 
          className={`mt-4 transition-all duration-700 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ 
            transitionDelay: animated ? '0.3s' : '0s'
          }}
        >
          <h2 
            className="text-2xl font-bold tracking-tight"
            style={{ 
              fontFamily: 'var(--font-clash-display)', 
              color: '#31afb4',
              lineHeight: '0.8em'
            }}
          >
            CREATIVE CURRENT
          </h2>
        </div>
      )}
    </div>
  );
};

export default ExtractedSvg;
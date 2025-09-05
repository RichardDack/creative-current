// src/components/ui/LogoComponent.tsx
'use client';

import { forwardRef } from 'react';
import { motion, MotionProps } from 'framer-motion';
import styles from '@/styles/components/LogoComponent.module.css';

export interface LogoProps extends Omit<MotionProps, 'children'> {
  /** Size variant for the logo */
  size?: 'small' | 'medium' | 'large' | 'responsive';
  /** Visual variant of the logo */
  variant?: 'default' | 'light' | 'dark';
  /** Custom className for additional styling */
  className?: string;
  /** Whether to show the tagline text */
  showTagline?: boolean;
  /** Custom width override */
  width?: number | string;
  /** Custom height override */
  height?: number | string;
  /** Accessibility label override */
  ariaLabel?: string;
}

export const LogoComponent = forwardRef<HTMLDivElement, LogoProps>(
  (
    {
      size = 'responsive',
      variant = 'default',
      className = '',
      showTagline = true,
      width,
      height,
      ariaLabel = 'Creative Current - Flowing Ideas Into Reality',
      ...motionProps
    },
    ref
  ) => {
    const logoClasses = [
      styles.logoContainer,
      styles[`size-${size}`],
      styles[`variant-${variant}`],
      className
    ].filter(Boolean).join(' ');

    const customStyles = {
      ...(width && { '--logo-width': typeof width === 'number' ? `${width}px` : width }),
      ...(height && { '--logo-height': typeof height === 'number' ? `${height}px` : height }),
    } as React.CSSProperties;

    return (
      <motion.div
        ref={ref}
        className={logoClasses}
        style={customStyles}
        role="img"
        aria-label={ariaLabel}
        {...motionProps}
      >
        <svg
          viewBox="0 0 350 100"
          className={styles.logoSvg}
          aria-labelledby="logo-title logo-desc"
        >
          <title id="logo-title">Creative Current</title>
          <desc id="logo-desc">
            Creative Current logo with flowing design elements and tagline &quot;Flowing Ideas Into Reality&quot;
          </desc>
          
          {/* Logo icon container with relative positioning */}
          <g
            className={styles.logoIcon}
            transform="matrix(0.76249462,0,0,0.76249462,-9.7511618,-10.832051)"
          >
            {/* Top logo part (teal) - optimized positioning */}
            <g className={styles.logoTop}>
              <path
                d="m 1162.09,668.4 c 191.27,0 357.11,105.44 444.86,261.87 -11.4,12.29 -22.82,24.59 -35.09,36.92 -49.15,43.03 -107.96,95.78 -193.04,102.83 -82.5,7.02 -155.32,-37.82 -228.13,-83.49 -74.58,-45.7 -149.17,-92.31 -232.51,-69.46 -11.42,3.54 -23.69,-3.48 -26.33,-14.93 -3.51,-11.4 3.51,-23.72 14.9,-26.33 101.78,-28.13 184.25,22.82 266.72,74.67 66.7,41.32 133.39,82.59 208.84,73.83 63.15,-7.92 121.09,-54.49 170.22,-97.56 -82.47,-128.32 -227.26,-213.55 -390.46,-213.55 -243.9,0 -443.96,188.06 -464.14,427.11 46.51,-33.41 125.48,-89.67 128.11,-91.41 137.74,-94.89 243.03,-29 348.32,36.05 71.94,44.81 151.81,94.02 233.38,73.8 79.83,-19.34 143.02,-75.57 200.06,-132.7 29.84,-27.23 50.89,3.54 27.2,27.23 -11.39,11.46 -67.56,62.41 -77.22,69.46 -43.88,35.15 -96.51,66.76 -152.68,79.08 -93.86,19.34 -173.7,-29.9 -253.56,-79.98 -87.72,-54.46 -176.37,-108.98 -285.17,-46.57 -32.45,18.44 -116.66,79.08 -170.21,118.64 l -16.65,12.33 -18.44,14.03 -7.89,5.28 c -0.87,-14.93 -1.77,-30.77 -1.77,-45.7 0,-282.98 228.16,-511.43 510.66,-511.43 z"
                fill="currentColor"
                fillRule="evenodd"
                transform="matrix(0.12,0,0,0.12,-58.183,-59.7)"
                className={styles.logoTopPath}
              />
            </g>
            
            {/* Bottom logo part (gray) - optimized positioning */}
            <g className={styles.logoBottom} transform="translate(0,40)">
              <path
                d="m 1162.09,1690.43 c -191.27,0 -357.95,-105.47 -445.7,-261.03 11.4,-13.16 22.79,-25.49 35.09,-36.89 49.12,-43.96 107.9,-96.68 193.01,-103.7 83.37,-7.02 155.31,37.79 228.16,83.49 74.55,46.54 149.14,92.25 232.47,69.4 11.43,-2.64 23.69,3.54 26.33,14.93 3.51,11.46 -3.51,23.75 -14.9,26.39 -101.78,28.13 -184.25,-22.85 -266.75,-74.7 -66.67,-41.29 -133.33,-82.62 -208.78,-72.93 -63.19,7.05 -121.09,53.59 -170.22,96.66 83.34,128.29 227.23,213.55 391.3,213.55 243.93,0 443.96,-188.06 463.27,-427.07 -46.48,33.38 -125.47,89.6 -128.11,91.38 -137.74,94.92 -243.03,29 -348.29,-36.02 -71.97,-44.84 -150.93,-94.05 -233.4,-73.83 -79.86,20.21 -143.89,76.47 -200.93,133.57 -22.82,25.49 -54.4,-3.51 -19.28,-35.15 22.79,-21.08 46.48,-43.07 70.17,-62.38 43.88,-35.15 96.5,-66.81 152.67,-79.11 93.9,-19.31 173.73,29.87 253.56,79.98 87.75,54.49 176.37,108.95 285.14,46.57 32.48,-18.47 116.72,-79.11 170.22,-118.64 l 16.68,-12.3 18.44,-14.06 7.89,-5.28 c 0.9,14.96 1.74,30.77 1.74,46.57 0,282.08 -228.1,510.59 -509.75,510.59 z"
                fill="currentColor"
                fillRule="evenodd"
                transform="matrix(0.12,0,0,0.12,-60.707,-101.221)"
                className={styles.logoBottomPath}
              />
            </g>
          </g>
          
          {/* Text container with relative positioning */}
          <g
            className={styles.logoText}
            transform="matrix(1.0462902,0,0,1.0462902,112.14862,-1.4830239)"
          >
            {/* Creative Current text - positioned relatively */}
            <text
              x="0"
              y="40"
              fill="currentColor"
              fontSize="28px"
              fontWeight="700"
              fontFamily="Arial, sans-serif"
              dominantBaseline="middle"
              className={styles.logoTitle}
            >
              Creative Current
            </text>
            
            {/* Flowing Ideas Into Reality text - positioned relatively */}
            {showTagline && (
              <text
                x="0"
                y="65"
                fill="currentColor"
                fontSize="16px"
                fontWeight="400"
                fontFamily="Arial, sans-serif"
                dominantBaseline="middle"
                className={styles.logoTagline}
              >
                Flowing Ideas Into Reality
              </text>
            )}
          </g>
        </svg>
      </motion.div>
    );
  }
);

LogoComponent.displayName = 'LogoComponent';
import React from 'react';
import { Icons } from './index';
import type { IconName } from '../../types/icons';

interface IconDemoProps {
  className?: string;
}

export const IconDemo: React.FC<IconDemoProps> = ({ className = '' }) => {
  const iconNames: IconName[] = [
    'Browser',
    'Check', 
    'Loading',
    'Flag',
    'Megaphone',
    'Window',
    'Question',
    'Cart'
  ];

  return (
    <div className={`icon-demo ${className}`}>
      <h3>Available Icons</h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
        gap: '1rem',
        padding: '1rem'
      }}>
        {iconNames.map((iconName) => {
          const IconComponent = Icons[iconName];
          return (
            <div 
              key={iconName}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1rem',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                gap: '0.5rem'
              }}
            >
              <IconComponent size={32} color="var(--color-primary, #31afb4)" />
              <span style={{ fontSize: '0.875rem', textAlign: 'center' }}>
                {iconName}
              </span>
            </div>
          );
        })}
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <h4>Usage Examples</h4>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Icons.Check size={16} color="green" />
          <Icons.Loading size={24} color="blue" />
          <Icons.Browser size={32} color="purple" />
          <Icons.Flag size={20} color="red" />
        </div>
      </div>
    </div>
  );
};
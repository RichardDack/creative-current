// src/components/ui/TownPageErrorBoundary.tsx - Client wrapper for ErrorBoundary
'use client';

import { ReactNode } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

interface TownPageErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  town: string;
  sectionName?: string;
}

export function TownPageErrorBoundary({ 
  children, 
  fallback, 
  town, 
  sectionName 
}: TownPageErrorBoundaryProps) {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error(`Error in ${sectionName || 'section'} for town ${town}:`, error, errorInfo);
  };

  return (
    <ErrorBoundary
      fallback={fallback}
      onError={handleError}
      resetKeys={[town]}
    >
      {children}
    </ErrorBoundary>
  );
}
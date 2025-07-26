'use client';

import { ReactNode } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

interface ErrorBoundaryWrapperProps {
  children: ReactNode;
}

const ErrorFallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="text-center">
      <h2 className="text-lg font-semibold text-red-600">오류가 발생했습니다</h2>
      <p className="mt-2 text-gray-600">경매 정보를 불러올 수 없습니다.</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-primary-500 hover:bg-primary-600 mt-4 rounded-lg px-4 py-2 text-white"
      >
        다시 시도
      </button>
    </div>
  </div>
);

const ErrorBoundaryWrapper = ({ children }: ErrorBoundaryWrapperProps) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error) => console.error('Error:', error)}
      onReset={() => window.location.reload()}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;

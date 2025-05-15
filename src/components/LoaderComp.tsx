import React from 'react';

interface LoaderCompProps {
  text?: string;
}

const LoaderComp: React.FC<LoaderCompProps> = ({ text = 'Loading...' }) => {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center p-8">
      <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>
      {text && <p className="text-center text-gray-600">{text}</p>}
    </div>
  );
};

export default LoaderComp;
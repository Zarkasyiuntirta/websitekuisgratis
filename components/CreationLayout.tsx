import React from 'react';

interface CreationLayoutProps {
  title: string;
  onBack: () => void;
  onDone: () => void;
  children: React.ReactNode;
  isDoneDisabled?: boolean;
}

const CreationLayout: React.FC<CreationLayoutProps> = ({ title, onBack, onDone, children, isDoneDisabled = false }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800 truncate">{title}</h1>
          <div>
            <button onClick={onBack} className="mr-2 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 border font-medium">
              Back
            </button>
            <button 
              onClick={onDone}
              disabled={isDoneDisabled}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 shadow-sm disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default CreationLayout;

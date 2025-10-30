import React from 'react';

interface PolicyLayoutProps {
  title: string;
  children: React.ReactNode;
  onBack: () => void;
}

const PolicyLayout: React.FC<PolicyLayoutProps> = ({ title, children, onBack }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl">
         <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-600">QuizWall</h1>
          <p className="text-gray-500 mt-2">Interactive activities for everyone</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
          <div className="prose prose-sm sm:prose-base max-w-none h-96 overflow-y-auto pr-4 text-gray-600">
            {children}
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={onBack}
              className="bg-blue-600 text-white py-2.5 px-8 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyLayout;

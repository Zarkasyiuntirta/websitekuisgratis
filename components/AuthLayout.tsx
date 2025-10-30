
import React from 'react';

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-600">QuizWall</h1>
          <p className="text-gray-500 mt-2">Interactive activities for everyone</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

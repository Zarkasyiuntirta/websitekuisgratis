import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import type { User } from '../types';

interface LoginViewProps {
  onLoginSubmit: (credentials: User) => boolean;
  onRegisterClick: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLoginSubmit, onRegisterClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const canSubmit = email && password;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!canSubmit) return;
    setError(null);
    const success = onLoginSubmit({ email, password });
    if (!success) {
      setError('Invalid email or password. Please try again.');
    }
  }

  return (
    <AuthLayout title="Log in">
      <form onSubmit={handleSubmit}>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">{error}</div>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
        >
          Log in
        </button>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button type="button" onClick={onRegisterClick} className="font-medium text-blue-600 hover:underline">
              Register
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginView;

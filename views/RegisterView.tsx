import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import type { User } from '../types';

interface RegisterViewProps {
  onLoginClick: () => void;
  onRegisterSubmit: (credentials: User) => boolean;
  onTermsClick: () => void;
  onPrivacyPolicyClick: () => void;
}

const RegisterView: React.FC<RegisterViewProps> = ({ onLoginClick, onRegisterSubmit, onTermsClick, onPrivacyPolicyClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = email && password && confirmPassword && password === confirmPassword && agreed;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    const success = onRegisterSubmit({ email, password });
    if (!success) {
      setError('An account with this email already exists.');
    }
  };

  return (
    <AuthLayout title="Create an account">
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
        <div className="mb-4">
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
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
           {password && confirmPassword && password !== confirmPassword && <p className="text-red-500 text-xs mt-1">Passwords do not match.</p>}
        </div>
        <div className="flex items-center mb-6">
          <input
            id="terms"
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            I accept the <button type="button" onClick={onTermsClick} className="font-medium text-blue-600 hover:underline">Terms of Use</button> & <button type="button" onClick={onPrivacyPolicyClick} className="font-medium text-blue-600 hover:underline">Privacy Policy</button>
          </label>
        </div>
        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
        >
          Register
        </button>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button type="button" onClick={onLoginClick} className="font-medium text-blue-600 hover:underline">
              Log in
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
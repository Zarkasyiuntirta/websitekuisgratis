import React, { useState, useCallback } from 'react';
import { View, Quiz, User } from './types';
import RegisterView from './views/RegisterView';
import LoginView from './views/LoginView';
import MainMenuView from './views/MainMenuView';
import CreateQuizView from './views/CreateQuizView';
import PlayQuizView from './views/PlayQuizView';
import TermsView from './views/TermsView';
import PrivacyPolicyView from './views/PrivacyPolicyView';


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Register);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const navigateTo = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  const handleRegister = (credentials: User): boolean => {
    if (users.some(user => user.email === credentials.email)) {
      return false; // User already exists
    }
    const newUsers = [...users, credentials];
    setUsers(newUsers);
    setCurrentUser(credentials);
    navigateTo(View.MainMenu);
    return true;
  };

  const handleLogin = (credentials: User): boolean => {
    const user = users.find(u => u.email === credentials.email);
    if (user && user.password === credentials.password) {
      setCurrentUser(user);
      navigateTo(View.MainMenu);
      return true;
    }
    return false; // Invalid credentials
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigateTo(View.Login);
  };

  const handleQuizCreated = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    navigateTo(View.PlayQuiz);
  };

  const renderView = () => {
    switch (currentView) {
      case View.Register:
        return (
          <RegisterView
            onLoginClick={() => navigateTo(View.Login)}
            onRegisterSubmit={handleRegister}
            onTermsClick={() => navigateTo(View.TermsOfUse)}
            onPrivacyPolicyClick={() => navigateTo(View.PrivacyPolicy)}
          />
        );
      case View.Login:
        return (
          <LoginView
            onLoginSubmit={handleLogin}
            onRegisterClick={() => navigateTo(View.Register)}
          />
        );
      case View.MainMenu:
        return <MainMenuView user={currentUser} onTemplateSelect={() => navigateTo(View.CreateQuiz)} onLogout={handleLogout} />;
      case View.CreateQuiz:
        return <CreateQuizView onBack={() => navigateTo(View.MainMenu)} onQuizCreated={handleQuizCreated} />;
      case View.PlayQuiz:
        if (activeQuiz) {
          return <PlayQuizView quiz={activeQuiz} onFinish={() => navigateTo(View.MainMenu)} />;
        }
        // Fallback if there's no active quiz
        return <MainMenuView user={currentUser} onTemplateSelect={() => navigateTo(View.CreateQuiz)} onLogout={handleLogout} />;
      case View.TermsOfUse:
        return <TermsView onBack={() => navigateTo(View.Register)} />;
      case View.PrivacyPolicy:
        return <PrivacyPolicyView onBack={() => navigateTo(View.Register)} />;
      default:
        return (
          <RegisterView
            onLoginClick={() => navigateTo(View.Login)}
            onRegisterSubmit={handleRegister}
            onTermsClick={() => navigateTo(View.TermsOfUse)}
            onPrivacyPolicyClick={() => navigateTo(View.PrivacyPolicy)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen font-sans antialiased">
      {renderView()}
    </div>
  );
};

export default App;
import React, { useState, useCallback } from 'react';
import { View, Quiz, User } from './types';
import RegisterView from './views/RegisterView';
import LoginView from './views/LoginView';
import MainMenuView from './views/MainMenuView';
import PlayQuizView from './views/PlayQuizView';
import TermsView from './views/TermsView';
import PrivacyPolicyView from './views/PrivacyPolicyView';

// Import all creation views
import CreateQuizView from './views/create/CreateQuizView';
import CreateAnagramView from './views/create/CreateAnagramView';
import CreateSpinWheelView from './views/create/CreateSpinWheelView';
import CreateOpenTheBoxView from './views/create/CreateOpenTheBoxView';
import CreateUnjumbleView from './views/create/CreateUnjumbleView';
import CreateMatchingPairsView from './views/create/CreateMatchingPairsView';
import CreateGroupSortView from './views/create/CreateGroupSortView';
import CreateMatchUpView from './views/create/CreateMatchUpView';
import CreateFlashCardView from './views/create/CreateFlashCardView';
import CreateSpeakingCardsView from './views/create/CreateSpeakingCardsView';
import CreateCompleteTheSentenceView from './views/create/CreateCompleteTheSentenceView';
import CreateFindTheMatchView from './views/create/CreateFindTheMatchView';

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

  const handleCreationDone = (data: unknown) => {
    console.log("Created activity data:", data);
    navigateTo(View.MainMenu);
  };
  
  const handleTemplateSelect = (templateName: string) => {
    switch(templateName) {
      case 'Quiz': navigateTo(View.CreateQuiz); break;
      case 'Anagram': navigateTo(View.CreateAnagram); break;
      case 'Spin the Wheel': navigateTo(View.CreateSpinWheel); break;
      case 'Open the Box': navigateTo(View.CreateOpenTheBox); break;
      case 'Unjumble': navigateTo(View.CreateUnjumble); break;
      case 'Matching Pairs': navigateTo(View.CreateMatchingPairs); break;
      case 'Group Sort': navigateTo(View.CreateGroupSort); break;
      case 'Match Up': navigateTo(View.CreateMatchUp); break;
      case 'Flash Card': navigateTo(View.CreateFlashCard); break;
      case 'Speaking Cards': navigateTo(View.CreateSpeakingCards); break;
      case 'Complete the Sentence': navigateTo(View.CreateCompleteTheSentence); break;
      case 'Find the Match': navigateTo(View.CreateFindTheMatch); break;
      default: navigateTo(View.CreateQuiz); break; // Default to standard quiz
    }
  };

  const renderView = () => {
    const backToMenu = () => navigateTo(View.MainMenu);
    switch (currentView) {
      case View.Register:
        return <RegisterView onLoginClick={() => navigateTo(View.Login)} onRegisterSubmit={handleRegister} onTermsClick={() => navigateTo(View.TermsOfUse)} onPrivacyPolicyClick={() => navigateTo(View.PrivacyPolicy)} />;
      case View.Login:
        return <LoginView onLoginSubmit={handleLogin} onRegisterClick={() => navigateTo(View.Register)} />;
      case View.MainMenu:
        return <MainMenuView user={currentUser} onTemplateSelect={handleTemplateSelect} onLogout={handleLogout} />;
      case View.PlayQuiz:
        if (activeQuiz) return <PlayQuizView quiz={activeQuiz} onFinish={backToMenu} />;
        return <MainMenuView user={currentUser} onTemplateSelect={handleTemplateSelect} onLogout={handleLogout} />;
      case View.TermsOfUse:
        return <TermsView onBack={() => navigateTo(View.Register)} />;
      case View.PrivacyPolicy:
        return <PrivacyPolicyView onBack={() => navigateTo(View.Register)} />;
      
      // Creation Views
      case View.CreateQuiz:
        return <CreateQuizView onBack={backToMenu} onDone={handleQuizCreated} />;
      case View.CreateAnagram:
        return <CreateAnagramView onBack={backToMenu} onDone={handleCreationDone} />;
      case View.CreateSpinWheel:
        return <CreateSpinWheelView onBack={backToMenu} onDone={handleCreationDone} />;
      case View.CreateOpenTheBox:
        return <CreateOpenTheBoxView onBack={backToMenu} onDone={handleCreationDone} />;
      case View.CreateUnjumble:
        return <CreateUnjumbleView onBack={backToMenu} onDone={handleCreationDone} />;
      case View.CreateMatchingPairs:
        return <CreateMatchingPairsView onBack={backToMenu} onDone={handleCreationDone} />;
      case View.CreateGroupSort:
        return <CreateGroupSortView onBack={backToMenu} onDone={handleCreationDone} />;
      case View.CreateMatchUp:
        return <CreateMatchUpView onBack={backToMenu} onDone={handleCreationDone} />;
      case View.CreateFlashCard:
        return <CreateFlashCardView onBack={backToMenu} onDone={handleCreationDone} />;
      case View.CreateSpeakingCards:
        return <CreateSpeakingCardsView onBack={backToMenu} onDone={handleCreationDone} />;
      case View.CreateCompleteTheSentence:
        return <CreateCompleteTheSentenceView onBack={backToMenu} onDone={handleCreationDone} />;
      case View.CreateFindTheMatch:
        return <CreateFindTheMatchView onBack={backToMenu} onDone={handleCreationDone} />;
        
      default:
        return <RegisterView onLoginClick={() => navigateTo(View.Login)} onRegisterSubmit={handleRegister} onTermsClick={() => navigateTo(View.TermsOfUse)} onPrivacyPolicyClick={() => navigateTo(View.PrivacyPolicy)} />;
    }
  };

  return (
    <div className="min-h-screen font-sans antialiased">
      {renderView()}
    </div>
  );
};

export default App;

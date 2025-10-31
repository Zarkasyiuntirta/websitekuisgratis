// FIX: Implement the main App component to manage application state and view routing.
import React, { useState, useEffect } from 'react';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import MainMenuView from './views/MainMenuView';
import TermsView from './views/TermsView';
import PrivacyPolicyView from './views/PrivacyPolicyView';
import CreateQuizView from './views/create/CreateQuizView';
import PlayQuizView from './views/PlayQuizView';
import CreateAnagramView from './views/create/CreateAnagramView';
import PlayAnagramView from './views/PlayAnagramView';

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

import PlaySpinWheelView from './views/PlaySpinWheelView';

import type { User, Quiz, AnagramData, SpinWheelData, ActivityData, SavedActivity } from './types';

type View =
  | 'login'
  | 'register'
  | 'mainMenu'
  | 'terms'
  | 'privacy'
  | 'create'
  | 'play';

const App: React.FC = () => {
  const [view, setView] = useState<View>('login');
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [user, setUser] = useState<User | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [currentActivity, setCurrentActivity] = useState<ActivityData | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [activities, setActivities] = useState<SavedActivity[]>([]);

  useEffect(() => {
    // Mock user and activity persistence
    try {
      const storedUsers = localStorage.getItem('quizwall_users');
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }

      const storedActivities = localStorage.getItem('quizwall_activities');
      if (storedActivities) {
        setActivities(JSON.parse(storedActivities));
      }

      const loggedInUser = localStorage.getItem('quizwall_user');
      if (loggedInUser) {
        setUser(JSON.parse(loggedInUser));
        setView('mainMenu');
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
    }
  }, []);

  const handleLoginSubmit = (credentials: User): boolean => {
    const foundUser = users.find(u => u.email === credentials.email && u.password === credentials.password);
    if (foundUser) {
      const userToSave = { email: foundUser.email };
      setUser(userToSave);
      localStorage.setItem('quizwall_user', JSON.stringify(userToSave));
      setView('mainMenu');
      return true;
    }
    return false;
  };

  const handleRegisterSubmit = (credentials: User): boolean => {
    if (users.some(u => u.email === credentials.email)) {
      return false;
    }
    const newUsers = [...users, credentials];
    setUsers(newUsers);
    localStorage.setItem('quizwall_users', JSON.stringify(newUsers));
    
    const userToSave = { email: credentials.email };
    setUser(userToSave);
    localStorage.setItem('quizwall_user', JSON.stringify(userToSave));

    setView('mainMenu');
    return true;
  };
  
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('quizwall_user');
    setView('login');
  };

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
    setView('create');
  };
  
  const handleCreationDone = (data: ActivityData) => {
    if (!user || !selectedTemplate) return;

    const newActivity: SavedActivity = {
      id: crypto.randomUUID(),
      userEmail: user.email,
      templateName: selectedTemplate,
      data: data,
    };

    const newActivities = [...activities, newActivity];
    setActivities(newActivities);
    localStorage.setItem('quizwall_activities', JSON.stringify(newActivities));

    setCurrentActivity(data);
    setView('play');
  };
  
  const handlePlayActivity = (activity: SavedActivity) => {
    setSelectedTemplate(activity.templateName);
    setCurrentActivity(activity.data);
    setView('play');
  };

  const handleDeleteActivity = (activityId: string) => {
    const newActivities = activities.filter(a => a.id !== activityId);
    setActivities(newActivities);
    localStorage.setItem('quizwall_activities', JSON.stringify(newActivities));
  };

  const handleBackToMenu = () => {
    setSelectedTemplate(null);
    setCurrentActivity(null);
    setView('mainMenu');
  }
  
  const renderCreateView = () => {
    switch (selectedTemplate) {
      case 'Quiz':
        return <CreateQuizView onBack={handleBackToMenu} onDone={handleCreationDone} />;
      case 'Anagram':
        return <CreateAnagramView onBack={handleBackToMenu} onDone={handleCreationDone} />;
      case 'Spin the Wheel':
        return <CreateSpinWheelView onBack={handleBackToMenu} onDone={handleCreationDone} />;
      case 'Open the Box':
        return <CreateOpenTheBoxView onBack={handleBackToMenu} onDone={handleCreationDone} />;
      case 'Unjumble':
        return <CreateUnjumbleView onBack={handleBackToMenu} onDone={handleCreationDone} />;
      case 'Matching Pairs':
        return <CreateMatchingPairsView onBack={handleBackToMenu} onDone={handleCreationDone} />;
      case 'Group Sort':
        return <CreateGroupSortView onBack={handleBackToMenu} onDone={handleCreationDone} />;
      case 'Match Up':
        return <CreateMatchUpView onBack={handleBackToMenu} onDone={handleCreationDone} />;
      case 'Flash Card':
        return <CreateFlashCardView onBack={handleBackToMenu} onDone={handleCreationDone} />;
      case 'Speaking Cards':
        return <CreateSpeakingCardsView onBack={handleBackToMenu} onDone={handleCreationDone} />;
      case 'Complete the Sentence':
        return <CreateCompleteTheSentenceView onBack={handleBackToMenu} onDone={handleCreationDone} />;
      case 'Find the Match':
        return <CreateFindTheMatchView onBack={handleBackToMenu} onDone={handleCreationDone} />;
      default:
        return <div>Template not found. <button onClick={handleBackToMenu}>Go Back</button></div>;
    }
  };
  
  const renderPlayView = () => {
    if (!currentActivity) return <div>No activity to play. <button onClick={handleBackToMenu}>Go Back</button></div>;

    switch(selectedTemplate) {
      case 'Quiz':
        return <PlayQuizView quiz={currentActivity as Quiz} onFinish={handleBackToMenu} />
      case 'Anagram':
        return <PlayAnagramView anagram={currentActivity as AnagramData} onFinish={handleBackToMenu} />
      case 'Spin the Wheel':
        return <PlaySpinWheelView data={currentActivity as SpinWheelData} onFinish={handleBackToMenu} />
      default:
        return <div>This activity cannot be played yet. <button onClick={handleBackToMenu}>Go Back</button></div>;
    }
  }

  if (view === 'terms') {
    return <TermsView onBack={() => { setView(authView); setAuthView('login'); }} />;
  }
  if (view === 'privacy') {
    return <PrivacyPolicyView onBack={() => { setView(authView); setAuthView('login'); }} />;
  }

  if (!user) {
    if (view === 'register') {
      return <RegisterView 
        onLoginClick={() => setView('login')} 
        onRegisterSubmit={handleRegisterSubmit}
        onTermsClick={() => { setAuthView('register'); setView('terms'); }}
        onPrivacyPolicyClick={() => { setAuthView('register'); setView('privacy'); }}
      />;
    }
    return <LoginView 
      onLoginSubmit={handleLoginSubmit} 
      onRegisterClick={() => setView('register')} 
    />;
  }

  if (view === 'mainMenu') {
    return <MainMenuView 
      user={user} 
      activities={activities.filter(a => a.userEmail === user.email)}
      onTemplateSelect={handleTemplateSelect} 
      onPlayActivity={handlePlayActivity}
      onDeleteActivity={handleDeleteActivity}
      onLogout={handleLogout} 
    />;
  }
  
  if (view === 'create') {
    return renderCreateView();
  }
  
  if (view === 'play') {
    return renderPlayView();
  }

  return <div>Loading...</div>;
};

export default App;
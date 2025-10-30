import React from 'react';
import TemplateCard from '../components/TemplateCard';
import type { User } from '../types';


interface MainMenuViewProps {
  user: User | null;
  onTemplateSelect: (template: string) => void;
  onLogout: () => void;
}

const templates = [
  { name: 'Quiz', imageUrl: 'https://picsum.photos/seed/quiz/400/300' },
  { name: 'Anagram', imageUrl: 'https://picsum.photos/seed/anagram/400/300' },
  { name: 'Spin the Wheel', imageUrl: 'https://picsum.photos/seed/wheel/400/300' },
  { name: 'Open the Box', imageUrl: 'https://picsum.photos/seed/box/400/300' },
  { name: 'Unjumble', imageUrl: 'https://picsum.photos/seed/unjumble/400/300' },
  { name: 'Matching Pairs', imageUrl: 'https://picsum.photos/seed/pairs/400/300' },
  { name: 'Group Sort', imageUrl: 'https://picsum.photos/seed/sort/400/300' },
  { name: 'Match Up', imageUrl: 'https://picsum.photos/seed/matchup/400/300' },
  { name: 'Flash Card', imageUrl: 'https://picsum.photos/seed/flashcard/400/300' },
  { name: 'Speaking Cards', imageUrl: 'https://picsum.photos/seed/speaking/400/300' },
  { name: 'Complete the Sentence', imageUrl: 'https://picsum.photos/seed/sentence/400/300' },
  { name: 'Find the Match', imageUrl: 'https://picsum.photos/seed/findmatch/400/300' },
];

const MainMenuView: React.FC<MainMenuViewProps> = ({ user, onTemplateSelect, onLogout }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">QuizWall</h1>
          <div className="flex items-center gap-4">
            {user && <span className="text-sm text-gray-600 hidden sm:block">Welcome, {user.email}</span>}
            <button onClick={onLogout} className="font-semibold text-gray-500 hover:text-red-500 transition-colors">Logout</button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Choose a template to start</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {templates.map((template) => (
            <TemplateCard
              key={template.name}
              title={template.name}
              imageUrl={template.imageUrl}
              onClick={() => onTemplateSelect(template.name)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default MainMenuView;

import React, { useState } from 'react';
import TemplateCard from '../components/TemplateCard';
import type { User, SavedActivity } from '../types';


interface MainMenuViewProps {
  user: User | null;
  activities: SavedActivity[];
  onTemplateSelect: (template: string) => void;
  onPlayActivity: (activity: SavedActivity) => void;
  onDeleteActivity: (activityId: string) => void;
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

const MainMenuView: React.FC<MainMenuViewProps> = ({ user, activities, onTemplateSelect, onPlayActivity, onDeleteActivity, onLogout }) => {
  const [isActivitiesVisible, setIsActivitiesVisible] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState<SavedActivity | null>(null);

  const openDeleteModal = (activity: SavedActivity) => {
    setActivityToDelete(activity);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setActivityToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    if (activityToDelete) {
      onDeleteActivity(activityToDelete.id);
    }
    closeDeleteModal();
  };


  return (
    <>
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
          {activities && activities.length > 0 && (
            <div className="mb-16">
              <button
                className="w-full flex justify-between items-center text-left p-2 rounded-lg hover:bg-gray-200/50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setIsActivitiesVisible(!isActivitiesVisible)}
                aria-expanded={isActivitiesVisible}
                aria-controls="my-activities-list"
              >
                <h2 className="text-3xl font-bold text-gray-900">My Activities</h2>
                <svg className={`w-6 h-6 text-gray-600 transform transition-transform ${isActivitiesVisible ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isActivitiesVisible && (
                <div id="my-activities-list" className="mt-4 bg-white rounded-lg shadow-sm overflow-hidden">
                  <ul className="divide-y divide-gray-200">
                    {activities.map((activity) => (
                      <li key={activity.id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                          <div onClick={() => onPlayActivity(activity)} className="flex-grow cursor-pointer flex justify-between items-center pr-4">
                              <div>
                                  <p className="font-semibold text-gray-800 text-lg">{activity.data.title}</p>
                                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{activity.templateName}</span>
                              </div>
                              <span className="text-blue-600 font-semibold hidden sm:block">Play Again &rarr;</span>
                          </div>
                          <button 
                              onClick={() => openDeleteModal(activity)} 
                              className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full"
                              aria-label={`Delete activity ${activity.data.title}`}
                          >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {activities && activities.length > 0 ? 'Create a New Activity' : 'Choose a template to start'}
          </h2>
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

      {isDeleteModalOpen && activityToDelete && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 transition-opacity" onClick={closeDeleteModal}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Activity</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Are you sure you want to delete "{activityToDelete.data.title}"? This action cannot be undone.
                </p>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
                <button type="button" onClick={confirmDelete} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Yes, Delete
                </button>
                <button type="button" onClick={closeDeleteModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainMenuView;
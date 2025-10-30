import React, { useState } from 'react';
import CreationLayout from '../../components/CreationLayout';
import type { SpeakingCardsData } from '../../types';
import ImageSelector from '../../components/ImageSelector';
import AudioSelector from '../../components/AudioSelector';

interface CreateSpeakingCardsViewProps {
  onBack: () => void;
  onDone: (data: SpeakingCardsData) => void;
}

const CreateSpeakingCardsView: React.FC<CreateSpeakingCardsViewProps> = ({ onBack, onDone }) => {
  const [title, setTitle] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [cards, setCards] = useState<{ id: string; text: string, imageUrl?: string }[]>([
    { id: crypto.randomUUID(), text: '' },
    { id: crypto.randomUUID(), text: '' },
  ]);

  const updateCard = (id: string, field: 'text' | 'imageUrl', value: string) => {
    setCards(cards.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addCard = () => {
    setCards([...cards, { id: crypto.randomUUID(), text: '' }]);
  };

  const removeCard = (id: string) => {
    if (cards.length > 2) {
      setCards(cards.filter(item => item.id !== id));
    }
  };
  
  const handleDone = () => {
      onDone({ title, audioUrl, cards: cards.filter(i => i.text.trim() !== '') });
  }

  const isDoneDisabled = !title.trim() || cards.filter(i => i.text.trim() !== '').length < 1;

  return (
    <CreationLayout title="Create Speaking Cards" onBack={onBack} onDone={handleDone} isDoneDisabled={isDoneDisabled}>
      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div className="space-y-4">
          <label htmlFor="activity-title" className="block text-sm font-medium text-gray-700">Activity Title</label>
          <input 
            type="text" 
            id="activity-title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Conversation Starters" 
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
           <AudioSelector audioUrl={audioUrl} onSelect={setAudioUrl} onRemove={() => setAudioUrl('')} />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Card Prompts</h3>
          <p className="text-sm text-gray-500 mb-4">Enter at least one prompt. Each will appear on a separate card.</p>
          <div className="space-y-3">
            {cards.map((card, index) => (
              <div key={card.id} className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">{index + 1}.</span>
                <input
                  type="text"
                  value={card.text}
                  onChange={(e) => updateCard(card.id, 'text', e.target.value)}
                  placeholder="e.g. What is your favorite holiday?"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                 <ImageSelector 
                  imageUrl={card.imageUrl}
                  onSelect={(url) => updateCard(card.id, 'imageUrl', url)}
                  onRemove={() => updateCard(card.id, 'imageUrl', '')}
                  searchText={card.text}
                />
                <button onClick={() => removeCard(card.id)} disabled={cards.length <= 2} className="text-gray-400 hover:text-red-500 disabled:text-gray-200 disabled:cursor-not-allowed">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            ))}
          </div>
          <button onClick={addCard} className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800">
            + Add another card
          </button>
        </div>
      </div>
    </CreationLayout>
  );
};

export default CreateSpeakingCardsView;
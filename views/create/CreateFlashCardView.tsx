import React, { useState } from 'react';
import CreationLayout from '../../components/CreationLayout';
import type { FlashCardData } from '../../types';
import ImageSelector from '../../components/ImageSelector';
import AudioSelector from '../../components/AudioSelector';


interface CreateFlashCardViewProps {
  onBack: () => void;
  onDone: (data: FlashCardData) => void;
}

const CreateFlashCardView: React.FC<CreateFlashCardViewProps> = ({ onBack, onDone }) => {
  const [title, setTitle] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [cards, setCards] = useState<{ id: string; term: string; imageUrl1?: string; definition: string; imageUrl2?: string }[]>([
    { id: crypto.randomUUID(), term: '', definition: '' },
    { id: crypto.randomUUID(), term: '', definition: '' },
  ]);

  const updateCard = (id: string, field: 'term' | 'definition' | 'imageUrl1' | 'imageUrl2', value: string) => {
    setCards(cards.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addCard = () => {
    setCards([...cards, { id: crypto.randomUUID(), term: '', definition: '' }]);
  };

  const removeCard = (id: string) => {
    if (cards.length > 2) {
      setCards(cards.filter(p => p.id !== id));
    }
  };

  const handleDone = () => {
    onDone({ title, audioUrl, cards: cards.filter(p => p.term.trim() && p.definition.trim()) });
  };

  const isDoneDisabled = !title.trim() || cards.filter(p => p.term.trim() && p.definition.trim()).length < 1;

  return (
    <CreationLayout title="Create Flash Cards" onBack={onBack} onDone={handleDone} isDoneDisabled={isDoneDisabled}>
      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div className="space-y-4">
          <label htmlFor="activity-title" className="block text-sm font-medium text-gray-700">Activity Title</label>
          <input type="text" id="activity-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Vocabulary" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
          <AudioSelector audioUrl={audioUrl} onSelect={setAudioUrl} onRemove={() => setAudioUrl('')} />
        </div>

        <div>
           <div className="grid grid-cols-12 gap-x-2 gap-y-1 mb-2 items-center">
            <h3 className="text-md font-medium text-gray-800 col-span-5 text-center">Term (Front)</h3>
            <h3 className="text-md font-medium text-gray-800 col-span-5 text-center">Definition (Back)</h3>
          </div>
          <div className="space-y-3">
            {cards.map((card, index) => (
              <div key={card.id} className="grid grid-cols-12 gap-2 items-center">
                <span className="text-gray-500 font-medium text-right pr-2">{index + 1}.</span>
                 <div className="col-span-5 flex items-center gap-2">
                    <input type="text" value={card.term} onChange={(e) => updateCard(card.id, 'term', e.target.value)} placeholder="e.g. Photosynthesis" className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                    <ImageSelector imageUrl={card.imageUrl1} onSelect={(url) => updateCard(card.id, 'imageUrl1', url)} onRemove={() => updateCard(card.id, 'imageUrl1', '')} searchText={card.term} />
                </div>
                 <div className="col-span-5 flex items-center gap-2">
                    <input type="text" value={card.definition} onChange={(e) => updateCard(card.id, 'definition', e.target.value)} placeholder="e.g. Process used by plants..." className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                    <ImageSelector imageUrl={card.imageUrl2} onSelect={(url) => updateCard(card.id, 'imageUrl2', url)} onRemove={() => updateCard(card.id, 'imageUrl2', '')} searchText={card.definition} />
                </div>
                <button onClick={() => removeCard(card.id)} disabled={cards.length <= 2} className="col-span-1 justify-self-center text-gray-400 hover:text-red-500 disabled:text-gray-200"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
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

export default CreateFlashCardView;
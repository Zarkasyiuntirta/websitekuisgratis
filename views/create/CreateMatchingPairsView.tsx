import React, { useState } from 'react';
import CreationLayout from '../../components/CreationLayout';
import type { MatchingPairsData } from '../../types';
import ImageSelector from '../../components/ImageSelector';
import AudioSelector from '../../components/AudioSelector';

interface CreateMatchingPairsViewProps {
  onBack: () => void;
  onDone: (data: MatchingPairsData) => void;
}

const CreateMatchingPairsView: React.FC<CreateMatchingPairsViewProps> = ({ onBack, onDone }) => {
  const [title, setTitle] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [pairs, setPairs] = useState<{ id: string; item1: string; imageUrl1?: string; item2: string; imageUrl2?: string }[]>([
    { id: crypto.randomUUID(), item1: '', item2: '' },
    { id: crypto.randomUUID(), item1: '', item2: '' },
  ]);

  const updatePair = (id: string, field: 'item1' | 'item2' | 'imageUrl1' | 'imageUrl2', value: string) => {
    setPairs(pairs.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addPair = () => {
    setPairs([...pairs, { id: crypto.randomUUID(), item1: '', item2: '' }]);
  };

  const removePair = (id: string) => {
    if (pairs.length > 2) {
      setPairs(pairs.filter(p => p.id !== id));
    }
  };

  const handleDone = () => {
    onDone({ title, audioUrl, pairs: pairs.filter(p => p.item1.trim() || p.item2.trim()) });
  };

  const isDoneDisabled = !title.trim() || pairs.filter(p => p.item1.trim() || p.item2.trim()).length < 1;

  return (
    <CreationLayout title="Create a 'Matching Pairs' Game" onBack={onBack} onDone={handleDone} isDoneDisabled={isDoneDisabled}>
      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div className="space-y-4">
          <label htmlFor="activity-title" className="block text-sm font-medium text-gray-700">Activity Title</label>
          <input type="text" id="activity-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Opposites" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
           <AudioSelector audioUrl={audioUrl} onSelect={setAudioUrl} onRemove={() => setAudioUrl('')} />
        </div>

        <div>
          <div className="grid grid-cols-12 gap-x-2 gap-y-1 mb-2 items-center">
            <h3 className="text-md font-medium text-gray-800 col-span-5 text-center">Item 1</h3>
            <h3 className="text-md font-medium text-gray-800 col-span-5 text-center">Item 2</h3>
          </div>
          <div className="space-y-3">
            {pairs.map((pair, index) => (
              <div key={pair.id} className="grid grid-cols-12 gap-2 items-center">
                <span className="text-gray-500 font-medium text-right pr-2">{index + 1}.</span>
                <div className="col-span-5 flex items-center gap-2">
                    <input type="text" value={pair.item1} onChange={(e) => updatePair(pair.id, 'item1', e.target.value)} placeholder="e.g. Hot" className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                    <ImageSelector imageUrl={pair.imageUrl1} onSelect={(url) => updatePair(pair.id, 'imageUrl1', url)} onRemove={() => updatePair(pair.id, 'imageUrl1', '')} searchText={pair.item1} />
                </div>
                 <div className="col-span-5 flex items-center gap-2">
                    <input type="text" value={pair.item2} onChange={(e) => updatePair(pair.id, 'item2', e.target.value)} placeholder="e.g. Cold" className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                    <ImageSelector imageUrl={pair.imageUrl2} onSelect={(url) => updatePair(pair.id, 'imageUrl2', url)} onRemove={() => updatePair(pair.id, 'imageUrl2', '')} searchText={pair.item2} />
                </div>
                <button onClick={() => removePair(pair.id)} disabled={pairs.length <= 2} className="col-span-1 justify-self-center text-gray-400 hover:text-red-500 disabled:text-gray-200"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
            ))}
          </div>
          <button onClick={addPair} className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800">
            + Add another pair
          </button>
        </div>
      </div>
    </CreationLayout>
  );
};

export default CreateMatchingPairsView;
import React, { useState } from 'react';
import CreationLayout from '../../components/CreationLayout';
import type { FindTheMatchData } from '../../types';
import ImageSelector from '../../components/ImageSelector';
import AudioSelector from '../../components/AudioSelector';

interface CreateFindTheMatchViewProps {
  onBack: () => void;
  onDone: (data: FindTheMatchData) => void;
}

const CreateFindTheMatchView: React.FC<CreateFindTheMatchViewProps> = ({ onBack, onDone }) => {
  const [title, setTitle] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [matches, setMatches] = useState<{ id: string; clue: string; imageUrl1?: string; answer: string; imageUrl2?: string }[]>([
    { id: crypto.randomUUID(), clue: '', answer: '' },
    { id: crypto.randomUUID(), clue: '', answer: '' },
  ]);

  const updateMatch = (id: string, field: 'clue' | 'answer' | 'imageUrl1' | 'imageUrl2', value: string) => {
    setMatches(matches.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addMatch = () => {
    setMatches([...matches, { id: crypto.randomUUID(), clue: '', answer: '' }]);
  };

  const removeMatch = (id: string) => {
    if (matches.length > 2) {
      setMatches(matches.filter(p => p.id !== id));
    }
  };

  const handleDone = () => {
    onDone({ title, audioUrl, matches: matches.filter(p => p.clue.trim() && p.answer.trim()) });
  };

  const isDoneDisabled = !title.trim() || matches.filter(p => p.clue.trim() && p.answer.trim()).length < 1;

  return (
    <CreationLayout title="Create a 'Find the Match' Game" onBack={onBack} onDone={handleDone} isDoneDisabled={isDoneDisabled}>
      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div className="space-y-4">
          <label htmlFor="activity-title" className="block text-sm font-medium text-gray-700">Activity Title</label>
          <input type="text" id="activity-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Country Capitals" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
          <AudioSelector audioUrl={audioUrl} onSelect={setAudioUrl} onRemove={() => setAudioUrl('')} />
        </div>

        <div>
          <div className="grid grid-cols-12 gap-x-2 gap-y-1 mb-2 items-center">
            <h3 className="text-md font-medium text-gray-800 col-span-5 text-center">Clue</h3>
            <h3 className="text-md font-medium text-gray-800 col-span-5 text-center">Answer</h3>
          </div>
          <div className="space-y-3">
            {matches.map((match, index) => (
              <div key={match.id} className="grid grid-cols-12 gap-2 items-center">
                <span className="text-gray-500 font-medium text-right pr-2">{index + 1}.</span>
                <div className="col-span-5 flex items-center gap-2">
                    <input type="text" value={match.clue} onChange={(e) => updateMatch(match.id, 'clue', e.target.value)} placeholder="e.g. France" className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                    <ImageSelector imageUrl={match.imageUrl1} onSelect={(url) => updateMatch(match.id, 'imageUrl1', url)} onRemove={() => updateMatch(match.id, 'imageUrl1', '')} searchText={match.clue} />
                </div>
                <div className="col-span-5 flex items-center gap-2">
                    <input type="text" value={match.answer} onChange={(e) => updateMatch(match.id, 'answer', e.target.value)} placeholder="e.g. Paris" className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                    <ImageSelector imageUrl={match.imageUrl2} onSelect={(url) => updateMatch(match.id, 'imageUrl2', url)} onRemove={() => updateMatch(match.id, 'imageUrl2', '')} searchText={match.answer} />
                </div>
                <button onClick={() => removeMatch(match.id)} disabled={matches.length <= 2} className="col-span-1 justify-self-center text-gray-400 hover:text-red-500 disabled:text-gray-200"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
            ))}
          </div>
          <button onClick={addMatch} className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800">
            + Add another item
          </button>
        </div>
      </div>
    </CreationLayout>
  );
};

export default CreateFindTheMatchView;
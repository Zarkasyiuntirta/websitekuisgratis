import React, { useState } from 'react';
import CreationLayout from '../../components/CreationLayout';
import type { CompleteTheSentenceData } from '../../types';
import ImageSelector from '../../components/ImageSelector';
import AudioSelector from '../../components/AudioSelector';

interface CreateCompleteTheSentenceViewProps {
  onBack: () => void;
  onDone: (data: CompleteTheSentenceData) => void;
}

const CreateCompleteTheSentenceView: React.FC<CreateCompleteTheSentenceViewProps> = ({ onBack, onDone }) => {
  const [title, setTitle] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [sentences, setSentences] = useState<{ id: string; text: string; imageUrl?: string }[]>([{ id: crypto.randomUUID(), text: '' }]);
  const [options, setOptions] = useState<{ id: string; text: string }[]>([{ id: crypto.randomUUID(), text: '' }, { id: crypto.randomUUID(), text: '' }]);

  const updateSentence = (id: string, field: 'text' | 'imageUrl', value: string) => setSentences(sentences.map(s => s.id === id ? { ...s, [field]: value } : s));
  const addSentence = () => setSentences([...sentences, { id: crypto.randomUUID(), text: '' }]);
  const removeSentence = (id: string) => { if (sentences.length > 1) setSentences(sentences.filter(s => s.id !== id))};

  const updateOption = (id: string, text: string) => setOptions(options.map(o => o.id === id ? { ...o, text } : o));
  const addOption = () => setOptions([...options, { id: crypto.randomUUID(), text: '' }]);
  const removeOption = (id: string) => { if (options.length > 2) setOptions(options.filter(o => o.id !== id))};

  const handleDone = () => {
    onDone({ 
      title, 
      audioUrl,
      sentences: sentences.filter(s => s.text.trim()),
      options: options.filter(o => o.text.trim()) 
    });
  };

  const isDoneDisabled = !title.trim() || sentences.filter(s => s.text.trim()).length < 1 || options.filter(o => o.text.trim()).length < 1;

  return (
    <CreationLayout title="Create a 'Complete the Sentence' Activity" onBack={onBack} onDone={handleDone} isDoneDisabled={isDoneDisabled}>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <label htmlFor="activity-title" className="block text-sm font-medium text-gray-700">Activity Title</label>
          <input type="text" id="activity-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Grammar Practice" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
          <AudioSelector audioUrl={audioUrl} onSelect={setAudioUrl} onRemove={() => setAudioUrl('')} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Sentences</h3>
          <p className="text-sm text-gray-500 mb-4">Type your sentences below. Use three underscores ___ to create a blank space.</p>
          <div className="space-y-3">
            {sentences.map((sentence, index) => (
              <div key={sentence.id} className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">{index + 1}.</span>
                <input type="text" value={sentence.text} onChange={(e) => updateSentence(sentence.id, 'text', e.target.value)} placeholder="The quick brown fox ___ over the lazy dog." className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                <ImageSelector 
                    imageUrl={sentence.imageUrl}
                    onSelect={(url) => updateSentence(sentence.id, 'imageUrl', url)}
                    onRemove={() => updateSentence(sentence.id, 'imageUrl', '')}
                    searchText={sentence.text}
                />
                <button onClick={() => removeSentence(sentence.id)} disabled={sentences.length <= 1} className="text-gray-400 hover:text-red-500 disabled:text-gray-200"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
            ))}
          </div>
          <button onClick={addSentence} className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800">+ Add another sentence</button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Answer Options</h3>
          <p className="text-sm text-gray-500 mb-4">These words will be available to drag into the blanks.</p>
          <div className="space-y-3">
            {options.map((option, index) => (
              <div key={option.id} className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">{index + 1}.</span>
                <input type="text" value={option.text} onChange={(e) => updateOption(option.id, e.target.value)} placeholder="jumps" className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                <button onClick={() => removeOption(option.id)} disabled={options.length <= 2} className="text-gray-400 hover:text-red-500 disabled:text-gray-200"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
            ))}
          </div>
          <button onClick={addOption} className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800">+ Add another option</button>
        </div>
      </div>
    </CreationLayout>
  );
};

export default CreateCompleteTheSentenceView;
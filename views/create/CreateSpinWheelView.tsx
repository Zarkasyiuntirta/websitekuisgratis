// FIX: Implement the CreateSpinWheelView component.
import React, { useState } from 'react';
import CreationLayout from '../../components/CreationLayout';
import type { SpinWheelData } from '../../types';
import AudioSelector from '../../components/AudioSelector';

interface CreateSpinWheelViewProps {
  onBack: () => void;
  onDone: (data: SpinWheelData) => void;
}

const CreateSpinWheelView: React.FC<CreateSpinWheelViewProps> = ({ onBack, onDone }) => {
  const [title, setTitle] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [wheelType, setWheelType] = useState<'simple' | 'question'>('simple');
  const [items, setItems] = useState<{ id: string; text: string; question?: string }[]>([
    { id: crypto.randomUUID(), text: '', question: '' },
    { id: crypto.randomUUID(), text: '', question: '' },
  ]);

  const updateItem = (id: string, field: 'text' | 'question', value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = () => {
    setItems([...items, { id: crypto.randomUUID(), text: '', question: '' }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 2) {
      setItems(items.filter(item => item.id !== id));
    }
  };
  
  const handleDone = () => {
      const validItems = items.filter(i => {
          if (wheelType === 'question') {
              return i.text.trim() !== '' && i.question?.trim() !== '';
          }
          return i.text.trim() !== '';
      });
      onDone({ title, audioUrl, wheelType, items: validItems });
  }

  const isDoneDisabled = !title.trim() || items.filter(i => i.text.trim() !== '').length < 2 || (wheelType === 'question' && items.some(i => i.text.trim() !== '' && i.question?.trim() === ''));

  return (
    <CreationLayout title="Create a 'Spin the Wheel' Game" onBack={onBack} onDone={handleDone} isDoneDisabled={isDoneDisabled}>
      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div className="space-y-4">
          <label htmlFor="activity-title" className="block text-sm font-medium text-gray-700">Activity Title</label>
          <input 
            type="text" 
            id="activity-title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Prize Wheel" 
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
           <AudioSelector audioUrl={audioUrl} onSelect={setAudioUrl} onRemove={() => setAudioUrl('')} />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Wheel Type</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input type="radio" name="wheelType" value="simple" checked={wheelType === 'simple'} onChange={() => setWheelType('simple')} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-700">Simple Wheel</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="wheelType" value="question" checked={wheelType === 'question'} onChange={() => setWheelType('question')} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-700">Wheel with Questions</span>
            </label>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Wheel Items</h3>
          <p className="text-sm text-gray-500 mb-4">Enter at least two items for the wheel. Blank items will be ignored.</p>
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center gap-2">
                <span className="text-gray-500 font-medium hidden sm:block">{index + 1}.</span>
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => updateItem(item.id, 'text', e.target.value)}
                  placeholder="Enter item text"
                  className="flex-grow w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {wheelType === 'question' && (
                  <input
                    type="text"
                    value={item.question}
                    onChange={(e) => updateItem(item.id, 'question', e.target.value)}
                    placeholder="Enter corresponding question"
                    className="flex-grow w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
                <button onClick={() => removeItem(item.id)} disabled={items.length <= 2} className="text-gray-400 hover:text-red-500 disabled:text-gray-200 disabled:cursor-not-allowed">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            ))}
          </div>
          <button onClick={addItem} className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800">
            + Add another item
          </button>
        </div>
      </div>
    </CreationLayout>
  );
};

export default CreateSpinWheelView;
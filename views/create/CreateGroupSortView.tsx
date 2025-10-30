import React, { useState } from 'react';
import CreationLayout from '../../components/CreationLayout';
import type { GroupSortData } from '../../types';
import ImageSelector from '../../components/ImageSelector';
import AudioSelector from '../../components/AudioSelector';

interface CreateGroupSortViewProps {
  onBack: () => void;
  onDone: (data: GroupSortData) => void;
}

const CreateGroupSortView: React.FC<CreateGroupSortViewProps> = ({ onBack, onDone }) => {
  const [title, setTitle] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [groups, setGroups] = useState<GroupSortData['groups']>([
    { id: crypto.randomUUID(), name: '', items: [{ id: crypto.randomUUID(), text: '' }] },
    { id: crypto.randomUUID(), name: '', items: [{ id: crypto.randomUUID(), text: '' }] },
  ]);

  const updateGroupName = (groupId: string, name: string) => {
    setGroups(groups.map(g => g.id === groupId ? { ...g, name } : g));
  };
  
  const addGroup = () => {
    setGroups([...groups, { id: crypto.randomUUID(), name: '', items: [{ id: crypto.randomUUID(), text: '' }] }]);
  };

  const removeGroup = (groupId: string) => {
    if (groups.length > 2) {
      setGroups(groups.filter(g => g.id !== groupId));
    }
  };

  const addItemToGroup = (groupId: string) => {
    setGroups(groups.map(g => g.id === groupId ? { ...g, items: [...g.items, { id: crypto.randomUUID(), text: '' }] } : g));
  };
  
  const updateItemInGroup = (groupId: string, itemId: string, field: 'text' | 'imageUrl', value: string) => {
    setGroups(groups.map(g => g.id === groupId ? { ...g, items: g.items.map(i => i.id === itemId ? { ...i, [field]: value } : i) } : g));
  };

  const removeItemFromGroup = (groupId: string, itemId: string) => {
    setGroups(groups.map(g => g.id === groupId ? { ...g, items: g.items.length > 1 ? g.items.filter(i => i.id !== itemId) : g.items } : g));
  };

  const handleDone = () => {
    const filteredGroups = groups
      .map(g => ({
        ...g,
        items: g.items.filter(i => i.text.trim() !== '')
      }))
      .filter(g => g.name.trim() !== '' && g.items.length > 0);
    onDone({ title, audioUrl, groups: filteredGroups });
  };

  const isDoneDisabled = !title.trim() || groups.filter(g => g.name.trim() !== '' && g.items.some(i => i.text.trim() !== '')).length < 2;

  return (
    <CreationLayout title="Create a Group Sort" onBack={onBack} onDone={handleDone} isDoneDisabled={isDoneDisabled}>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <label htmlFor="activity-title" className="block text-sm font-medium text-gray-700">Activity Title</label>
          <input type="text" id="activity-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Food Groups" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
          <AudioSelector audioUrl={audioUrl} onSelect={setAudioUrl} onRemove={() => setAudioUrl('')} />
        </div>
        
        <div className="space-y-6">
          {groups.map((group, index) => (
            <div key={group.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">Group {index + 1}</h3>
                <button onClick={() => removeGroup(group.id)} disabled={groups.length <= 2} className="text-gray-400 hover:text-red-500 disabled:text-gray-200"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
              </div>
              <input type="text" value={group.name} onChange={(e) => updateGroupName(group.id, e.target.value)} placeholder="Group name (e.g. Fruits)" className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
              <div className="space-y-2">
                {group.items.map(item => (
                  <div key={item.id} className="flex items-center gap-2">
                    <input type="text" value={item.text} onChange={(e) => updateItemInGroup(group.id, item.id, 'text', e.target.value)} placeholder="Item content" className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                    <ImageSelector imageUrl={item.imageUrl} onSelect={(url) => updateItemInGroup(group.id, item.id, 'imageUrl', url)} onRemove={() => updateItemInGroup(group.id, item.id, 'imageUrl', '')} searchText={item.text} />
                    <button onClick={() => removeItemFromGroup(group.id, item.id)} disabled={group.items.length <= 1} className="text-gray-400 hover:text-red-500 disabled:text-gray-200"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                  </div>
                ))}
              </div>
              <button onClick={() => addItemToGroup(group.id)} className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800">+ Add an item to this group</button>
            </div>
          ))}
        </div>

        <button onClick={addGroup} className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 border-2 border-dashed border-blue-300 transition-colors">
          + Add Group
        </button>
      </div>
    </CreationLayout>
  );
};

export default CreateGroupSortView;
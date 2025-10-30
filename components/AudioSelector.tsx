import React, { useState, useCallback } from 'react';

interface AudioSelectorProps {
  audioUrl?: string;
  onSelect: (url: string) => void;
  onRemove: () => void;
}

const AudioSelector: React.FC<AudioSelectorProps> = ({ audioUrl, onSelect, onRemove }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlInput, setUrlInput] = useState(audioUrl || '');
  const [activeTab, setActiveTab] = useState<'url' | 'upload'>('url');
  const [isDragging, setIsDragging] = useState(false);

  const handleOpenModal = () => {
    setUrlInput(audioUrl || '');
    setActiveTab('url');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsDragging(false);
  };

  const handleSave = () => {
    onSelect(urlInput);
    handleCloseModal();
  };
  
  const processFile = (file: File) => {
    if (file && file.type.startsWith('audio/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onSelect(e.target.result as string);
          handleCloseModal();
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid audio file.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const searchUrl = `https://www.google.com/search?q=royalty+free+background+music`;

  return (
    <>
      <div className="flex items-center gap-4">
        <label className="block text-sm font-medium text-gray-700">Background Audio (Optional)</label>
        {!audioUrl ? (
          <button
            type="button"
            onClick={handleOpenModal}
            className="flex items-center gap-2 text-sm text-blue-600 font-medium hover:text-blue-800"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" /></svg>
            Add Audio
          </button>
        ) : (
          <div className="flex items-center gap-2 text-sm text-gray-700 p-2 pl-3 bg-gray-100 rounded-md border">
            <span className="truncate max-w-xs text-ellipsis overflow-hidden">{audioUrl.startsWith('data:') ? 'Local file' : audioUrl}</span>
            <button type="button" onClick={handleOpenModal} className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
            <button type="button" onClick={onRemove} className="text-red-500 hover:text-red-700 font-bold">&times;</button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={handleCloseModal}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
             <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Select Background Audio</h3>
                <div className="border-b border-gray-200 mb-4">
                  <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                    <button onClick={() => setActiveTab('url')} className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'url' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>From URL</button>
                    <button onClick={() => setActiveTab('upload')} className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'upload' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Upload File</button>
                  </nav>
                </div>
                
                {activeTab === 'url' && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Paste the URL of an audio file (e.g., MP3).</p>
                    <div className="flex items-center gap-2 mb-4">
                       <input
                        type="text"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com/song.mp3"
                      />
                       <a href={searchUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline whitespace-nowrap">Search...</a>
                    </div>
                  </div>
                )}

                {activeTab === 'upload' && (
                  <div>
                    <input
                        type="file"
                        id="audioUpload"
                        className="hidden"
                        accept="audio/*"
                        onChange={handleFileChange}
                      />
                    <div 
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      className={`flex justify-center items-center w-full h-32 px-6 py-4 border-2 border-dashed rounded-md cursor-pointer transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}`}
                      onClick={() => document.getElementById('audioUpload')?.click()}
                    >
                       <div className="text-center">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">MP3, WAV, etc.</p>
                      </div>
                    </div>
                  </div>
                )}
             </div>
             <div className="bg-gray-50 px-6 py-3 flex justify-end gap-3 rounded-b-lg">
                <button type="button" onClick={handleCloseModal} className="bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 border font-medium">Cancel</button>
                {activeTab === 'url' && <button type="button" onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">Save</button>}
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AudioSelector;
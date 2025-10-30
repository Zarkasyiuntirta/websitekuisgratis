import React, { useState, useCallback } from 'react';

interface ImageSelectorProps {
  imageUrl?: string;
  onSelect: (url: string) => void;
  onRemove: () => void;
  searchText?: string;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ imageUrl, onSelect, onRemove, searchText = '' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlInput, setUrlInput] = useState(imageUrl || '');
  const [activeTab, setActiveTab] = useState<'url' | 'upload'>('url');
  const [isDragging, setIsDragging] = useState(false);

  const handleOpenModal = () => {
    setUrlInput(imageUrl || '');
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
  
  const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemove();
  }

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onSelect(e.target.result as string);
          handleCloseModal();
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
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
  
  const searchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(searchText)}`;

  return (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={handleOpenModal}
          className="w-16 h-12 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-300 hover:text-gray-600 transition-colors overflow-hidden border-2 border-dashed border-gray-300"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {!imageUrl && (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          )}
        </button>
        {imageUrl && (
           <button type="button" onClick={handleRemove} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold shadow-md">&times;</button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={handleCloseModal}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
             <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Select Image</h3>
                <div className="border-b border-gray-200 mb-4">
                  <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                    <button onClick={() => setActiveTab('url')} className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'url' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>From URL</button>
                    <button onClick={() => setActiveTab('upload')} className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'upload' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Upload File</button>
                  </nav>
                </div>

                {activeTab === 'url' && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Paste the URL of an image below.</p>
                    <div className="flex items-center gap-2 mb-4">
                      <input
                        type="text"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com/image.jpg"
                      />
                      {searchText && (
                        <a href={searchUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline whitespace-nowrap">Search...</a>
                      )}
                    </div>
                  </div>
                )}
                
                {activeTab === 'upload' && (
                  <div>
                     <input
                        type="file"
                        id="imageUpload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    <div 
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      className={`flex justify-center items-center w-full h-32 px-6 py-4 border-2 border-dashed rounded-md cursor-pointer transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}`}
                      onClick={() => document.getElementById('imageUpload')?.click()}
                    >
                      <div className="text-center">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
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

export default ImageSelector;
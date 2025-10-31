// FIX: Implement the PlaySpinWheelView component.
import React, { useState, useEffect, useRef } from 'react';
import type { SpinWheelData } from '../types';

interface PlaySpinWheelViewProps {
  data: SpinWheelData;
  onFinish: () => void;
}

type SpinWheelItem = SpinWheelData['items'][0];

const PlaySpinWheelView: React.FC<PlaySpinWheelViewProps> = ({ data, onFinish }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningItem, setWinningItem] = useState<SpinWheelItem | null>(null);
  const [rotation, setRotation] = useState(0);
  const [availableItems, setAvailableItems] = useState<SpinWheelItem[]>(data.items);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'wheel' | 'question'>('wheel');
  const audioRef = useRef<HTMLAudioElement>(null);

  const totalItems = availableItems.length;
  const anglePerItem = totalItems > 0 ? 360 / totalItems : 360;

  const colors = ['#f87171', '#fb923c', '#facc15', '#a3e635', '#4ade80', '#34d399', '#22d3ee', '#60a5fa', '#818cf8', '#c084fc'];
  
  useEffect(() => {
    if(data.audioUrl) {
      audioRef.current?.play().catch(error => {
        console.log("Audio autoplay prevented by browser.");
      });
    }
    return () => {
      audioRef.current?.pause();
    };
  }, [data.audioUrl]);

  const handleSpin = () => {
    if (isSpinning || totalItems === 0) return;

    setIsSpinning(true);
    setWinningItem(null);

    const randomSpins = Math.floor(Math.random() * 5) + 5;
    const randomIndex = Math.floor(Math.random() * totalItems);
    
    // Calculate the target rotation based on the random winner index
    const baseAngle = 360 / totalItems;
    const targetAngle = 360 - (randomIndex * baseAngle);
    const randomOffset = (Math.random() * baseAngle) - (baseAngle / 2);
    
    const newRotation = (randomSpins * 360) + targetAngle + randomOffset;
    
    const winner = availableItems[randomIndex];
    
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWinningItem(winner);
      if (data.wheelType === 'question') {
        setViewMode('question');
      } else {
        setIsModalOpen(true);
      }
    }, 6000); // Corresponds to transition duration
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
    setWinningItem(null);
  };
  
  const handleContinueFromQuestion = () => {
    if (winningItem) {
      setAvailableItems(availableItems.filter(item => item.id !== winningItem.id));
    }
    setWinningItem(null);
    setViewMode('wheel');
  };

  const handleEliminate = () => {
    if (winningItem) {
      setAvailableItems(availableItems.filter(item => item.id !== winningItem.id));
    }
    handleModalClose();
  };
  
  const handleRestart = () => {
    setAvailableItems(data.items);
    setRotation(0);
    handleModalClose();
     if(data.audioUrl) {
        audioRef.current?.play().catch(e => console.log("Audio autoplay prevented."));
    }
  }

  const backgroundStyle = {
    background: `linear-gradient(-45deg, #facc15, #f87171, #818cf8, #4ade80)`,
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite',
  };

  if (availableItems.length === 0) {
     return (
      <div style={backgroundStyle} className="flex flex-col items-center justify-center min-h-screen text-white p-4">
         <style>{`@keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }`}</style>
        <div className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center max-w-md w-full">
          <h1 className="text-4xl font-bold mb-6">Game Over</h1>
          <p className="text-xl opacity-80 mb-8">All items have been eliminated.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={handleRestart} className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg">Play Again</button>
            <button onClick={onFinish} className="w-full bg-blue-500/50 text-white py-3 rounded-lg font-semibold hover:bg-blue-500/80 transition-all transform hover:scale-105 shadow-lg">Back to Menu</button>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'question' && winningItem) {
    return (
      <div style={backgroundStyle} className="min-h-screen flex flex-col items-center justify-center p-4 text-white overflow-hidden">
        <style>{`@keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }`}</style>
        {data.audioUrl && <audio ref={audioRef} src={data.audioUrl} loop />}
        <div className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center max-w-2xl w-full">
            <h2 className="text-xl font-semibold mb-4">The wheel landed on:</h2>
            <p className="text-5xl font-bold text-white mb-8 break-words">{winningItem.text}</p>
             <div className="bg-black/20 p-6 rounded-lg mt-4 mb-8">
                 <p className="text-2xl font-medium text-white text-center break-words">{winningItem.question}</p>
             </div>
            <button onClick={handleContinueFromQuestion} className="w-full max-w-xs mx-auto bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg">
              Continue
            </button>
        </div>
      </div>
    );
  }

  return (
    <div style={backgroundStyle} className="min-h-screen flex flex-col items-center justify-center p-4 text-white overflow-hidden">
      <style>{`@keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }`}</style>
      {data.audioUrl && <audio ref={audioRef} src={data.audioUrl} loop />}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-20">
        <button onClick={onFinish} className="bg-white/10 px-3 py-1 rounded-md text-white/80 hover:bg-white/20 transition">&larr; Exit</button>
        <h1 className="text-2xl font-bold text-center text-white/90 drop-shadow-md">{data.title}</h1>
        <div className="w-20"></div>
      </div>
      
      <div className="relative flex flex-col items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]" style={{ transform: 'translateX(-50%) translateY(-165px)', zIndex: 10}}>
          <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-red-500"></div>
        </div>
        
        <div
          className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full border-8 border-white/50 shadow-2xl overflow-hidden transition-transform duration-[6000ms] ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {availableItems.map((item, index) => {
             const rotate = index * anglePerItem;
             const skew = totalItems > 1 ? 90 - anglePerItem : 0;
             return (
              <div
                key={item.id}
                className="absolute w-1/2 h-1/2 origin-bottom-right"
                style={{
                  transform: `rotate(${rotate}deg) skewY(-${skew}deg)`,
                  backgroundColor: colors[index % colors.length],
                }}
              >
                <div 
                  className="absolute w-[150%] h-[150%] -top-[25%] -left-[25%] text-center text-black font-bold text-sm sm:text-base p-2 flex items-center justify-center"
                  style={{ transform: `skewY(${skew}deg) rotate(${anglePerItem / 2}deg)` }}
                >
                  <span className="block truncate max-w-full leading-tight">{item.text}</span>
                </div>
              </div>
            );
          })}
        </div>
        
        <button 
          onClick={handleSpin} 
          disabled={isSpinning}
          className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white text-blue-600 font-extrabold text-xl sm:text-2xl uppercase shadow-lg border-4 border-blue-300 transform transition hover:scale-110 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Spin
        </button>
      </div>

      {isModalOpen && winningItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 transition-opacity" onClick={handleModalClose}>
          <div className="bg-white text-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="p-8 text-center">
                <h2 className="text-xl font-semibold mb-2">The wheel landed on:</h2>
                <p className="text-4xl font-bold text-blue-600 mb-8 break-words">{winningItem.text}</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={handleEliminate} className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-all transform hover:scale-105 shadow-lg">Eliminate</button>
                  <button onClick={handleModalClose} className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all transform hover:scale-105 shadow-lg">Resume</button>
                </div>
              </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PlaySpinWheelView;

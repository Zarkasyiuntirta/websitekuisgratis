import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { AnagramData } from '../types';

interface PlayAnagramViewProps {
  anagram: AnagramData;
  onFinish: () => void;
}

interface Letter {
  char: string;
  id: number;
  originalIndex: number;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const PlayAnagramView: React.FC<PlayAnagramViewProps> = ({ anagram, onFinish }) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const [poolLetters, setPoolLetters] = useState<Letter[]>([]);
  const [answerLetters, setAnswerLetters] = useState<Letter[]>([]);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentItem = anagram.items[currentItemIndex];
  const correctAnswer = useMemo(() => currentItem.text.replace(/\s/g, ''), [currentItem]);

  useEffect(() => {
    const wordWithoutSpaces = currentItem.text.replace(/\s/g, '');
    const letters = wordWithoutSpaces.split('').map((char, index) => ({ char, id: Math.random(), originalIndex: index }));
    setPoolLetters(shuffleArray(letters));
    setAnswerLetters([]);
    setIsSubmitted(false);
    setIsCorrect(false);
  }, [currentItemIndex, currentItem]);
  
  useEffect(() => {
    if(anagram.audioUrl) {
      audioRef.current?.play().catch(error => {
        console.log("Audio autoplay prevented by browser.");
      });
    }
    return () => {
      audioRef.current?.pause();
    };
  }, [anagram.audioUrl]);

  const handlePoolLetterClick = (letter: Letter) => {
    if(isSubmitted) return;
    setPoolLetters(poolLetters.filter(l => l.id !== letter.id));
    setAnswerLetters([...answerLetters, letter]);
  };
  
  const handleAnswerLetterClick = (letter: Letter) => {
    if(isSubmitted) return;
    setAnswerLetters(answerLetters.filter(l => l.id !== letter.id));
    setPoolLetters([...poolLetters, letter]);
  };

  const handleSubmit = () => {
    if (isSubmitted) return;
    const userAnswer = answerLetters.map(l => l.char).join('');
    const correct = userAnswer === correctAnswer;
    setIsCorrect(correct);
    setIsSubmitted(true);
    if (correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentItemIndex < anagram.items.length - 1) {
      setCurrentItemIndex(i => i + 1);
    } else {
      setIsFinished(true);
      audioRef.current?.pause();
    }
  };
  
  const handlePlayAgain = () => {
    setCurrentItemIndex(0);
    setScore(0);
    setIsFinished(false);
    if(anagram.audioUrl) {
        audioRef.current?.play().catch(e => console.log("Audio autoplay prevented."));
    }
  }

  const backgroundStyle = {
    background: `linear-gradient(-45deg, #23a6d5, #23d5ab, #ee7752, #e73c7e)`,
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite',
  };

  if (isFinished) {
    return (
      <div style={backgroundStyle} className="flex flex-col items-center justify-center min-h-screen text-white p-4">
         <style>{`@keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }`}</style>
        <div className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center max-w-md w-full">
          <h1 className="text-4xl font-bold mb-2">Activity Complete!</h1>
          <p className="text-xl opacity-80 mb-6">Your final score is:</p>
          <div className="text-6xl font-extrabold mb-8">{score} / {anagram.items.length}</div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={handlePlayAgain} className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg">Play Again</button>
            <button onClick={onFinish} className="w-full bg-blue-500/50 text-white py-3 rounded-lg font-semibold hover:bg-blue-500/80 transition-all transform hover:scale-105 shadow-lg">Back to Menu</button>
          </div>
        </div>
      </div>
    );
  }

  const getAnswerBoxClass = () => {
      if(!isSubmitted) return 'border-white/40';
      return isCorrect ? 'border-green-400 bg-green-500/20' : 'border-red-400 bg-red-500/20';
  }

  return (
    <div style={backgroundStyle} className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8 text-white transition-all duration-500">
       <style>{`@keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }`}</style>
      {anagram.audioUrl && <audio ref={audioRef} src={anagram.audioUrl} loop />}
       <div className="w-full max-w-3xl mx-auto flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <button onClick={onFinish} className="bg-white/10 px-3 py-1 rounded-md text-white/80 hover:bg-white/20 transition">&larr; Exit</button>
          <h1 className="text-2xl font-bold text-center text-white/90 drop-shadow-md">{anagram.title}</h1>
          <div className="text-lg font-semibold">Score: {score}</div>
        </div>

        <div className="bg-black/20 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl flex-grow flex flex-col justify-center items-center">
            <p className="w-full text-right text-white/70 mb-4 font-medium">Item {currentItemIndex + 1} of {anagram.items.length}</p>
            {currentItem.imageUrl && (
                <div className="mb-6">
                    <img src={currentItem.imageUrl} alt="Anagram clue" className="max-h-52 w-auto mx-auto rounded-lg shadow-lg" />
                </div>
            )}
            
            {/* Answer Area */}
            <div className={`flex flex-wrap justify-center items-center gap-2 p-4 rounded-lg border-2 min-h-[72px] w-full transition-colors duration-300 ${getAnswerBoxClass()}`}>
              {answerLetters.map(letter => (
                <button key={letter.id} onClick={() => handleAnswerLetterClick(letter)} className="w-12 h-14 bg-white/90 text-blue-900 rounded-md text-3xl font-bold shadow-lg flex items-center justify-center transition transform hover:scale-105">
                  {letter.char}
                </button>
              ))}
              {answerLetters.length === 0 && <span className="text-white/60">Click letters below to form the answer</span>}
            </div>
            
            {/* Pool Area */}
            <div className="flex flex-wrap justify-center items-center gap-2 p-4 mt-6 min-h-[72px] w-full">
              {poolLetters.map(letter => (
                 <button key={letter.id} onClick={() => handlePoolLetterClick(letter)} className="w-12 h-14 bg-white/20 text-white rounded-md text-3xl font-bold shadow-md flex items-center justify-center transition transform hover:bg-white/40 hover:scale-110">
                  {letter.char}
                </button>
              ))}
            </div>
            
             <div className="mt-8 text-center h-16 flex items-center justify-center">
              {!isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={answerLetters.length !== correctAnswer.length}
                    className="bg-white text-blue-600 px-10 py-3 rounded-lg font-semibold hover:bg-opacity-90 shadow-xl transition-transform transform hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Submit
                  </button>
              ) : (
                  <button
                    onClick={handleNext}
                    className="bg-white text-blue-600 px-10 py-3 rounded-lg font-semibold hover:bg-opacity-90 shadow-xl transition-transform transform hover:scale-105"
                  >
                    {currentItemIndex < anagram.items.length - 1 ? 'Next' : 'Finish'}
                  </button>
              )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default PlayAnagramView;

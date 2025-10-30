import React, { useState, useEffect, useRef } from 'react';
import type { Quiz, Answer } from '../types';

interface PlayQuizViewProps {
  quiz: Quiz;
  onFinish: () => void;
}

const PlayQuizView: React.FC<PlayQuizViewProps> = ({ quiz, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if(quiz.audioUrl) {
      audioRef.current?.play().catch(error => {
        console.log("Audio autoplay prevented by browser.");
      });
    }
    return () => {
      audioRef.current?.pause();
    };
  }, [quiz.audioUrl]);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;

  const handleAnswerClick = (answer: Answer) => {
    if (selectedAnswerId) return; // Prevent changing answer

    setSelectedAnswerId(answer.id);
    if (answer.isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerId(null);
    } else {
      setIsFinished(true);
      audioRef.current?.pause();
    }
  };
  
  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswerId(null);
    setIsFinished(false);
    if(quiz.audioUrl) {
        audioRef.current?.play().catch(e => console.log("Audio autoplay prevented."));
    }
  }

  const getButtonClass = (answer: Answer) => {
    if (!selectedAnswerId) {
      return 'bg-white/20 hover:bg-white/40 border-white/30 text-white';
    }
    if (answer.isCorrect) {
      return 'bg-green-500/80 border-green-300 text-white scale-105 shadow-lg';
    }
    if (answer.id === selectedAnswerId && !answer.isCorrect) {
      return 'bg-red-500/80 border-red-300 text-white opacity-70';
    }
    return 'bg-white/10 border-white/20 text-white/50 opacity-60';
  };

  const backgroundStyle = {
    background: `linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)`,
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite',
  };

  if (isFinished) {
    return (
      <div style={backgroundStyle} className="flex flex-col items-center justify-center min-h-screen text-white p-4">
         <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
        <div className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center max-w-md w-full">
          <h1 className="text-4xl font-bold mb-2">Quiz Complete!</h1>
          <p className="text-xl opacity-80 mb-6">Your final score is:</p>
          <div className="text-6xl font-extrabold mb-8">{score} / {totalQuestions}</div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handlePlayAgain}
              className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
            >
              Play Again
            </button>
            <button
              onClick={onFinish}
              className="w-full bg-blue-500/50 text-white py-3 rounded-lg font-semibold hover:bg-blue-500/80 transition-all transform hover:scale-105 shadow-lg"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={backgroundStyle} className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8 text-white transition-all duration-500">
       <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      {quiz.audioUrl && <audio ref={audioRef} src={quiz.audioUrl} loop />}
      <div className="w-full max-w-3xl mx-auto flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <button onClick={onFinish} className="bg-white/10 px-3 py-1 rounded-md text-white/80 hover:bg-white/20 transition">&larr; Exit</button>
          <h1 className="text-2xl font-bold text-center text-white/90 drop-shadow-md">{quiz.title}</h1>
          <div className="w-16"></div>
        </div>
        
        <div className="relative w-full bg-white/20 rounded-full h-2.5 mb-6 shadow-inner">
          <div className="bg-white h-2.5 rounded-full shadow-lg" style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`, transition: 'width 0.5s ease-in-out' }}></div>
        </div>

        <div className="bg-black/20 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl flex-grow flex flex-col justify-center">
          <p className="text-right text-white/70 mb-4 font-medium">Question {currentQuestionIndex + 1} of {totalQuestions}</p>
          
          {currentQuestion.imageUrl && (
            <div className="mb-6">
                <img src={currentQuestion.imageUrl} alt="Question" className="max-h-60 w-auto mx-auto rounded-lg shadow-lg" />
            </div>
          )}

          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8 text-center drop-shadow-lg">{currentQuestion.text}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.answers.map((answer) => (
              <button
                key={answer.id}
                onClick={() => handleAnswerClick(answer)}
                disabled={!!selectedAnswerId}
                className={`p-3 rounded-lg border-2 text-left font-semibold text-lg transition-all duration-300 transform disabled:cursor-not-allowed backdrop-blur-sm flex items-center gap-4 ${getButtonClass(answer)}`}
              >
                {answer.imageUrl && <img src={answer.imageUrl} alt="" className="w-12 h-12 object-cover rounded-md flex-shrink-0 bg-black/20" />}
                <span className="flex-grow">{answer.text}</span>
              </button>
            ))}
          </div>
          
          {selectedAnswerId && (
            <div className="mt-8 text-center h-16 flex items-center justify-center">
              <button
                onClick={handleNext}
                className="bg-white text-blue-600 px-10 py-3 rounded-lg font-semibold hover:bg-opacity-90 shadow-xl transition-transform transform hover:scale-105"
              >
                {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayQuizView;
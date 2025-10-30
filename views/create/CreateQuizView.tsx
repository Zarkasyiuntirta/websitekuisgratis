import React, { useState } from 'react';
import type { Question, Answer, Quiz } from '../../types';
import CreationLayout from '../../components/CreationLayout';
import ImageSelector from '../../components/ImageSelector';
import AudioSelector from '../../components/AudioSelector';

interface CreateQuizViewProps {
  onBack: () => void;
  onDone: (quiz: Quiz) => void;
}

const CreateQuizView: React.FC<CreateQuizViewProps> = ({ onBack, onDone }) => {
  const [title, setTitle] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { id: crypto.randomUUID(), text: '', answers: [{ id: crypto.randomUUID(), text: '', isCorrect: true }, { id: crypto.randomUUID(), text: '', isCorrect: false }] },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { id: crypto.randomUUID(), text: '', answers: [{ id: crypto.randomUUID(), text: '', isCorrect: true }, { id: crypto.randomUUID(), text: '', isCorrect: false }] },
    ]);
  };

  const handleRemoveQuestion = (questionId: string) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
  };
  
  const handleQuestionChange = (questionId: string, field: 'text' | 'imageUrl', value: string) => {
    setQuestions(questions.map(q => q.id === questionId ? {...q, [field]: value} : q));
  };

  const handleAddAnswer = (questionId: string) => {
    setQuestions(questions.map(q => q.id === questionId ? {...q, answers: [...q.answers, {id: crypto.randomUUID(), text: '', isCorrect: false}]} : q));
  };

  const handleRemoveAnswer = (questionId: string, answerId: string) => {
    setQuestions(questions.map(q => q.id === questionId ? {...q, answers: q.answers.filter(a => a.id !== answerId)} : q));
  };
  
  const handleAnswerChange = (questionId: string, answerId: string, field: 'text' | 'imageUrl', value: string) => {
    setQuestions(questions.map(q => q.id === questionId ? {...q, answers: q.answers.map(a => a.id === answerId ? {...a, [field]: value} : a)} : q));
  };

  const handleSetCorrectAnswer = (questionId: string, answerId: string) => {
     setQuestions(questions.map(q => q.id === questionId ? {...q, answers: q.answers.map(a => ({...a, isCorrect: a.id === answerId}))} : q));
  };
  
  const handleSaveQuiz = () => {
    const quizData = { title, questions, audioUrl };
    onDone(quizData);
  };

  const isDoneDisabled = !title.trim() || questions.some(q => !q.text.trim() || q.answers.some(a => !a.text.trim()));

  return (
    <CreationLayout title="Create a New Quiz" onBack={onBack} onDone={handleSaveQuiz} isDoneDisabled={isDoneDisabled}>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label htmlFor="quiz-title" className="block text-sm font-medium text-gray-700">Quiz Title</label>
            <input 
              type="text" 
              id="quiz-title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. World Capitals" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
           <AudioSelector audioUrl={audioUrl} onSelect={setAudioUrl} onRemove={() => setAudioUrl('')} />
        </div>

        {questions.map((question, qIndex) => (
          <div key={question.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Question {qIndex + 1}</h2>
              <button onClick={() => handleRemoveQuestion(question.id)} className="text-red-500 hover:text-red-700" disabled={questions.length <= 1}>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
            <div className="flex items-start gap-3 mb-4">
              <textarea 
                value={question.text}
                onChange={(e) => handleQuestionChange(question.id, 'text', e.target.value)}
                placeholder="Enter your question here..." 
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows={2}
              />
               <ImageSelector 
                  imageUrl={question.imageUrl} 
                  onSelect={(url) => handleQuestionChange(question.id, 'imageUrl', url)}
                  onRemove={() => handleQuestionChange(question.id, 'imageUrl', '')}
                  searchText={question.text}
                />
            </div>
            <div className="space-y-3">
              {question.answers.map((answer, aIndex) => (
                <div key={answer.id} className="flex items-center gap-2">
                   <button onClick={() => handleSetCorrectAnswer(question.id, answer.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${answer.isCorrect ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300 hover:border-green-400'}`}>
                    {answer.isCorrect && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </button>
                  <input
                    type="text"
                    value={answer.text}
                    onChange={(e) => handleAnswerChange(question.id, answer.id, 'text', e.target.value)}
                    placeholder={`Answer ${aIndex + 1}`}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ImageSelector 
                    imageUrl={answer.imageUrl} 
                    onSelect={(url) => handleAnswerChange(question.id, answer.id, 'imageUrl', url)}
                    onRemove={() => handleAnswerChange(question.id, answer.id, 'imageUrl', '')}
                    searchText={answer.text}
                  />
                  <button onClick={() => handleRemoveAnswer(question.id, answer.id)} disabled={question.answers.length <= 2} className="text-gray-400 hover:text-red-500 disabled:text-gray-200 disabled:cursor-not-allowed">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => handleAddAnswer(question.id)} className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800">
              + Add another answer
            </button>
          </div>
        ))}

        <button onClick={handleAddQuestion} className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 border-2 border-dashed border-blue-300 transition-colors">
          + Add Question
        </button>
      </div>
    </CreationLayout>
  );
};

export default CreateQuizView;
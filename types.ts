export enum View {
  Register,
  Login,
  MainMenu,
  PlayQuiz,
  TermsOfUse,
  PrivacyPolicy,
  
  // Creation Views
  CreateQuiz,
  CreateAnagram,
  CreateSpinWheel,
  CreateOpenTheBox,
  CreateUnjumble,
  CreateMatchingPairs,
  CreateGroupSort,
  CreateMatchUp,
  CreateFlashCard,
  CreateSpeakingCards,
  CreateCompleteTheSentence,
  CreateFindTheMatch,
}

//--- Standard Quiz ---
export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
  imageUrl?: string;
}

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
  imageUrl?: string;
}

export interface Quiz {
  title: string;
  questions: Question[];
  audioUrl?: string;
}

//--- User ---
export interface User {
  email: string;
  password: string;
}

//--- Template Data Structures ---

export interface AnagramData {
  title: string;
  items: { id: string; text: string; imageUrl?: string }[];
  audioUrl?: string;
}

export interface SpinWheelData {
  title: string;
  items: { id: string; text: string; imageUrl?: string }[];
  audioUrl?: string;
}

export interface OpenTheBoxData {
  title: string;
  items: { id: string; text: string; imageUrl?: string }[];
  audioUrl?: string;
}

export interface UnjumbleData {
  title: string;
  items: { id: string; text: string; imageUrl?: string }[];
  audioUrl?: string;
}

export interface MatchingPairsData {
  title: string;
  pairs: { id: string; item1: string; imageUrl1?: string; item2: string; imageUrl2?: string }[];
  audioUrl?: string;
}

export interface GroupSortData {
  title: string;
  groups: {
    id: string;
    name: string;
    items: { id: string; text: string; imageUrl?: string }[];
  }[];
  audioUrl?: string;
}

export interface MatchUpData {
  title: string;
  pairs: { id: string; keyword: string; imageUrl1?: string; definition: string; imageUrl2?: string }[];
  audioUrl?: string;
}

export interface FlashCardData {
  title: string;
  cards: { id: string; term: string; imageUrl1?: string; definition: string; imageUrl2?: string }[];
  audioUrl?: string;
}

export interface SpeakingCardsData {
  title: string;
  cards: { id:string; text: string; imageUrl?: string }[];
  audioUrl?: string;
}

export interface CompleteTheSentenceData {
  title: string;
  sentences: { id: string; text: string; imageUrl?: string }[];
  options: { id: string; text: string }[];
  audioUrl?: string;
}

export interface FindTheMatchData {
  title: string;
  matches: { id: string; clue: string; imageUrl1?: string; answer: string; imageUrl2?: string }[];
  audioUrl?: string;
}
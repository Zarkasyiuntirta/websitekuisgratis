export enum View {
  Register,
  Login,
  MainMenu,
  CreateQuiz,
  PlayQuiz,
  TermsOfUse,
  PrivacyPolicy,
}

export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
}

export interface Quiz {
  title: string;
  questions: Question[];
}

export interface User {
  email: string;
  password: string;
}
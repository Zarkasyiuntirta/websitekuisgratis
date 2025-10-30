// FIX: Define all necessary types for the application.
export interface User {
  email: string;
  password?: string; // Password should be optional on the user object after login
}

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

export interface AnagramData {
  title: string;
  audioUrl?: string;
  items: {
    id: string;
    text: string;
    imageUrl?: string;
  }[];
}

export interface SpinWheelData {
  title: string;
  audioUrl?: string;
  wheelType: 'simple' | 'question';
  items: {
    id: string;
    text: string;
    question?: string;
  }[];
}

export interface OpenTheBoxData {
  title: string;
  audioUrl?: string;
  items: {
    id: string;
    text: string;
    imageUrl?: string;
  }[];
}

export interface UnjumbleData {
  title: string;
  audioUrl?: string;
  items: {
    id: string;
    text: string;
    imageUrl?: string;
  }[];
}

export interface MatchingPairsData {
  title: string;
  audioUrl?: string;
  pairs: {
    id: string;
    item1: string;
    imageUrl1?: string;
    item2: string;
    imageUrl2?: string;
  }[];
}

export interface GroupSortData {
  title: string;
  audioUrl?: string;
  groups: {
    id: string;
    name: string;
    items: {
      id: string;
      text: string;
      imageUrl?: string;
    }[];
  }[];
}

export interface MatchUpData {
  title: string;
  audioUrl?: string;
  pairs: {
    id: string;
    keyword: string;
    imageUrl1?: string;
    definition: string;
    imageUrl2?: string;
  }[];
}

export interface FlashCardData {
  title: string;
  audioUrl?: string;
  cards: {
    id: string;
    term: string;
    imageUrl1?: string;
    definition: string;
    imageUrl2?: string;
  }[];
}

export interface SpeakingCardsData {
  title: string;
  audioUrl?: string;
  cards: {
    id: string;
    text: string;
    imageUrl?: string;
  }[];
}

export interface CompleteTheSentenceData {
    title: string;
    audioUrl?: string;
    sentences: {
      id: string;
      text: string;
      imageUrl?: string;
    }[];
    options: {
      id: string;
      text: string;
    }[];
}

export interface FindTheMatchData {
    title: string;
    audioUrl?: string;
    matches: {
        id: string;
        clue: string;
        imageUrl1?: string;
        answer: string;
        imageUrl2?: string;
    }[];
}

// Union type for all activity data
export type ActivityData = Quiz | AnagramData | SpinWheelData | OpenTheBoxData | UnjumbleData | MatchingPairsData | GroupSortData | MatchUpData | FlashCardData | SpeakingCardsData | CompleteTheSentenceData | FindTheMatchData;
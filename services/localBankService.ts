
import { Question, STAGES_PER_CHAPTER } from "../types";

const LOCAL_BANK_KEY = 'sanguo_local_bank_v1';

// Chapters that deserve more questions
export const MAJOR_CHAPTERS = [1, 5, 25, 30, 42, 45, 48, 50, 77, 83, 104, 120];

export interface BankData {
  [chapter: number]: {
    [stage: number]: Question[];
  };
}

export const getLocalBank = (): BankData => {
  const saved = localStorage.getItem(LOCAL_BANK_KEY);
  return saved ? JSON.parse(saved) : {};
};

export const saveToLocalBank = (chapter: number, stage: number, question: Question) => {
  const bank = getLocalBank();
  if (!bank[chapter]) bank[chapter] = {};
  if (!bank[chapter][stage]) bank[chapter][stage] = [];
  
  // Prevent duplicates based on question text
  const exists = bank[chapter][stage].some(q => q.text === question.text);
  if (!exists) {
    bank[chapter][stage].push(question);
    localStorage.setItem(LOCAL_BANK_KEY, JSON.stringify(bank));
  }
};

export const getRandomFromBank = (chapter: number, stage: number): Question | null => {
  const bank = getLocalBank();
  const questions = bank[chapter]?.[stage];
  if (!questions || questions.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};

export const getBankStats = () => {
  const bank = getLocalBank();
  let totalQuestions = 0;
  let unlockedStages = 0;
  
  // Fix: Explicitly cast Object.values to handle TypeScript inference issues on indexed objects
  (Object.values(bank) as Array<Record<number, Question[]>>).forEach(chap => {
    (Object.values(chap) as Question[][]).forEach(stageQuestions => {
      // Correctly typed access to .length fixes the 'unknown' property access errors
      totalQuestions += stageQuestions.length;
      if (stageQuestions.length > 0) unlockedStages++;
    });
  });
  
  return { totalQuestions, unlockedStages };
};

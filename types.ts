
export enum Difficulty {
  EASY = 'Easy',
  NORMAL = 'Normal',
  HARD = 'Hard',
  VERY_HARD = 'Very Hard'
}

export type GameMode = 'story' | 'free';
export type QuestionSource = 'ai' | 'local';

export interface AppSettings {
  questionSource: QuestionSource;
}

export interface Question {
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  difficulty: Difficulty;
  hint: string;
}

export interface BossInfo {
  name: string;
  courtesy: string;
  description: string;
  visualPrompt: string;
  defeatQuote: string;
  hp: number;
}

export interface LevelStatus {
  chapter: number;
  stage: number;
}

export interface PlayerState {
  currentLevel: LevelStatus;
  maxUnlockedLevel: LevelStatus;
  lives: number;
  settings: AppSettings;
}

export const TOTAL_CHAPTERS = 120;
export const STAGES_PER_CHAPTER = 3;

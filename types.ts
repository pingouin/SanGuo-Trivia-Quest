export enum Difficulty {
  EASY = 'Easy',
  NORMAL = 'Normal',
  HARD = 'Hard',
  VERY_HARD = 'Very Hard'
}

export interface Question {
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  difficulty: Difficulty;
  hint: string; // "Guan Xing" hint
}

export interface BossInfo {
  name: string;
  courtesy: string; // 字或号
  description: string;
  visualPrompt: string;
  defeatQuote: string; // Quote spoken when defeated
  hp: number; // 2 for normal, 3 for major bosses
}

export interface LevelStatus {
  chapter: number;
  stage: number; // 1, 2, 3, or 4 (Boss)
}

export interface PlayerState {
  currentLevel: LevelStatus;
  maxUnlockedLevel: LevelStatus;
  lives: number;
}

export const TOTAL_CHAPTERS = 120;
export const STAGES_PER_CHAPTER = 4;
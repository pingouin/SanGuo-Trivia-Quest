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
  bossCharacter?: string; // Only present if it's a boss level
  bossVisualPrompt?: string; // Description for image generation
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

export const TOTAL_CHAPTERS = 120; // Romance of the Three Kingdoms has 120 chapters
export const STAGES_PER_CHAPTER = 4; // 1-1, 1-2, 1-3, 1-Boss
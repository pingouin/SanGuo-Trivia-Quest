
import { Difficulty, Question, BossInfo, QuestionSource } from "../types";
import { generateLevelQuestion } from "./geminiService";
import { getRandomFromBank, saveToLocalBank, getLocalBank } from "./localBankService";
import { SEED_QUESTIONS } from "../data/seedBank";

export const getQuestion = async (
  source: QuestionSource,
  chapter: number,
  stage: number,
  difficulty: Difficulty,
  bossContext?: BossInfo,
  excludeQuestions: string[] = []
): Promise<Question> => {
  // 1. If Local Source requested
  if (source === 'local') {
    // Try user's collected bank first
    const bank = getLocalBank();
    const questions = bank[chapter]?.[stage] || [];
    const availableQuestions = questions.filter(q => !excludeQuestions.includes(q.text));
    
    if (availableQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      return availableQuestions[randomIndex];
    }
    
    // Try predefined seed bank next (filtering repeats)
    const seeds = SEED_QUESTIONS[chapter]?.[stage] || [];
    const availableSeeds = seeds.filter(q => !excludeQuestions.includes(q.text));
    if (availableSeeds.length > 0) return availableSeeds[0];
    
    // Fallback: If no local data or all used up, we MUST use AI to fulfill
    console.warn("Local bank empty or exhausted for this stage, falling back to AI.");
  }
  
  // 2. Fetch from AI (either because source is AI or local failed/exhausted)
  const aiQ = await generateLevelQuestion(chapter, stage, difficulty, bossContext, excludeQuestions);
  
  // 3. Automatically save AI questions to local bank for future offline use
  saveToLocalBank(chapter, stage, aiQ);
  
  return aiQ;
};

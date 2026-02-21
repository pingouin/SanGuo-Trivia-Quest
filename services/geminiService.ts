
import { GoogleGenAI, Type } from "@google/genai";
import { Difficulty, Question, BossInfo, STAGES_PER_CHAPTER } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Determine model based on task complexity
const TEXT_MODEL = "gemini-3-flash-preview"; 
const IMAGE_MODEL = "gemini-2.5-flash-image";

export const generateLevelQuestion = async (
  chapter: number,
  stage: number,
  difficulty: Difficulty,
  bossContext?: BossInfo,
  excludeQuestions: string[] = []
): Promise<Question> => {
  const isBoss = stage === STAGES_PER_CHAPTER;
  
  let prompt = `
    请基于《三国演义》第 ${chapter} 回的内容，生成一道单项选择题。
    
    当前关卡：${stage}/${STAGES_PER_CHAPTER}。
    难度等级：${difficulty}。
  `;

  if (isBoss && bossContext) {
    prompt += `
      这是一个BOSS关卡（守关大将：${bossContext.name}）。
      1. 问题必须与【${bossContext.name}】在第 ${chapter} 回中的事迹、对话或战斗相关。
      2. 问题应当具有挑战性，测试玩家对该情节的熟悉程度。
      3. 解析中应当提及 ${bossContext.name} 在此回的作用。
    `;
  } else {
    prompt += `
      这是一个普通遭遇战关卡。请关注情节细节或次要角色。
    `;
  }

  if (excludeQuestions.length > 0) {
    prompt += `
      注意：请不要生成与以下内容重复或极其相似的问题：
      ${excludeQuestions.join('\n')}
    `;
  }

  prompt += `
    同时，请提供一个"hint"（观星提示），它应该给出一个关键线索，或者排除一个错误答案，但不能直接给出正确答案。
    严格遵守以下 JSON 格式输出，所有文本必须使用简体中文：
  `;

  const response = await ai.models.generateContent({
    model: TEXT_MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING, description: "问题描述" },
          options: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING }, 
            description: "三个选项，其中一个是正确的" 
          },
          correctAnswerIndex: { type: Type.INTEGER, description: "正确选项的索引 (0, 1, 或 2)" },
          explanation: { type: Type.STRING, description: "答案解析" },
          difficulty: { type: Type.STRING },
          hint: { type: Type.STRING, description: "锦囊提示，用于帮助玩家" }
        },
        required: ["text", "options", "correctAnswerIndex", "explanation", "difficulty", "hint"],
      },
    },
  });

  const rawText = response.text;
  if (!rawText) throw new Error("Failed to generate question");
  
  return JSON.parse(rawText) as Question;
};

export const generateBossAvatar = async (visualPrompt: string): Promise<string | null> => {
  try {
    const fullPrompt = `Chibi style character sticker of Three Kingdoms character: ${visualPrompt}. 
    Unified Style Guide:
    - Cute Q-version / Chibi proportions (big head, small body)
    - Thick vector-like black outlines
    - Flat, vibrant cell-shading colors
    - White background
    - Minimalist details but recognizable features
    - High quality game asset`;

    const response = await ai.models.generateContent({
      model: IMAGE_MODEL,
      contents: { parts: [{ text: fullPrompt }] },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation failed:", error);
    return null; 
  }
};

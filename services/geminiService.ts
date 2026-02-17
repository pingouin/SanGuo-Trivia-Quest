import { GoogleGenAI, Type } from "@google/genai";
import { Difficulty, Question } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Determine model based on task complexity
const TEXT_MODEL = "gemini-3-flash-preview"; 
const IMAGE_MODEL = "gemini-2.5-flash-image";

export const generateLevelQuestion = async (
  chapter: number,
  stage: number,
  difficulty: Difficulty
): Promise<Question> => {
  const isBoss = stage === 4;
  
  const prompt = `
    请基于《三国演义》第 ${chapter} 回的内容，生成一道单项选择题。
    
    当前关卡：${stage}/4。
    难度等级：${difficulty}。
    
    ${isBoss ? `
      这是一个BOSS关卡。
      1. 请找出第 ${chapter} 回中出现的一个关键角色（反派或正派）作为“BOSS”。
      2. 问题应该是具有挑战性的，并且与该角色或本回的主要战役/事件相关。
      3. 在 'bossCharacter' 字段中提供角色中文名称。
      4. 在 'bossVisualPrompt' 字段中提供该角色的简短视觉描述（用于生成图片），例如“吕布，身披兽面吞头铠，手持方天画戟，神情威猛”。
    ` : `
      这是一个普通遭遇战关卡。请关注情节细节或次要角色。
    `}

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
          bossCharacter: { type: Type.STRING, description: "BOSS角色名 (仅BOSS关卡需要)" },
          bossVisualPrompt: { type: Type.STRING, description: "BOSS形象描述 (仅BOSS关卡需要)" }
        },
        required: ["text", "options", "correctAnswerIndex", "explanation", "difficulty"],
      },
    },
  });

  const rawText = response.text;
  if (!rawText) throw new Error("Failed to generate question");
  
  return JSON.parse(rawText) as Question;
};

export const generateBossAvatar = async (visualPrompt: string): Promise<string | null> => {
  try {
    const prompt = `A cute Q-version (chibi style) character sticker of ${visualPrompt}. 
    White background, vector art style, thick outlines, vibrant colors, ancient Chinese armor/clothing. 
    High quality, game asset style.`;

    const response = await ai.models.generateContent({
      model: IMAGE_MODEL,
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        // Nano banana models do not support responseMimeType/responseSchema
      }
    });

    // Extract image from response
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation failed:", error);
    return null; // Graceful fallback
  }
};

import { Question, Difficulty } from "../types";

export const SEED_QUESTIONS: Record<number, Record<number, Question[]>> = {
  1: {
    1: [{
      text: "东汉末年，导致天下大乱、黄巾起义爆发的直接朝政原因是？",
      options: ["十常侍乱政", "董卓进京", "曹操挟天子"],
      correctAnswerIndex: 0,
      explanation: "灵帝时，张让、赵忠等十人封侯，称'十常侍'，横征暴敛，导致民不聊生。",
      difficulty: Difficulty.EASY,
      hint: "是一群受宠信的宦官。"
    }],
    2: [{
      text: "刘备、关羽、张飞三人是在什么地方结为异姓兄弟的？",
      options: ["张飞宅后的桃园", "幽州刺史府", "新野县衙"],
      correctAnswerIndex: 0,
      explanation: "三人志同道合，在张飞庄后桃园祭告天地，结为兄弟。",
      difficulty: Difficulty.EASY,
      hint: "一种春季开花的水果树林。"
    }],
    3: [{
      text: "在讨伐黄巾军的过程中，张角自称为什么？",
      options: ["天公将军", "地公将军", "人公将军"],
      correctAnswerIndex: 0,
      explanation: "张角自称天公将军，其弟张宝称地公将军，张梁称人公将军。",
      difficulty: Difficulty.HARD,
      hint: "他是三兄弟中的老大，代表'天'。"
    }]
  }
};

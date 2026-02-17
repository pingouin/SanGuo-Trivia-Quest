import React, { useState, useEffect } from 'react';
import { Question, LevelStatus, Difficulty } from '../types';
import { generateLevelQuestion, generateBossAvatar } from '../services/geminiService';
import { getChapterTitle } from '../chapterData';
import { LoadingSpinner } from './LoadingSpinner';
import { CheckCircle2, XCircle, Sword, Scroll, ArrowRight } from 'lucide-react';

interface GameLevelProps {
  levelStatus: LevelStatus;
  onComplete: (success: boolean) => void;
  onBack: () => void;
}

const GameLevel: React.FC<GameLevelProps> = ({ levelStatus, onComplete, onBack }) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [bossImage, setBossImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  // Determine difficulty based on level and randomness, or strict progression
  const getDifficulty = (): Difficulty => {
    if (levelStatus.stage === 4) return Difficulty.HARD;
    if (levelStatus.chapter > 80) return Difficulty.VERY_HARD;
    if (levelStatus.chapter > 40) return Difficulty.NORMAL;
    return Difficulty.EASY;
  };

  useEffect(() => {
    const initLevel = async () => {
      setLoading(true);
      setQuestion(null);
      setBossImage(null);
      setSelectedOption(null);
      setIsAnswered(false);

      try {
        const q = await generateLevelQuestion(
          levelStatus.chapter, 
          levelStatus.stage, 
          getDifficulty()
        );
        setQuestion(q);

        if (q.bossCharacter && q.bossVisualPrompt) {
          setImageLoading(true);
          // Non-blocking image generation
          generateBossAvatar(q.bossVisualPrompt).then(img => {
            setBossImage(img);
            setImageLoading(false);
          });
        }
      } catch (e) {
        console.error("Error loading level", e);
      } finally {
        setLoading(false);
      }
    };

    initLevel();
  }, [levelStatus]); // Re-run when levelStatus changes

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (question && selectedOption === question.correctAnswerIndex) {
      onComplete(true);
    } else {
      onComplete(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <LoadingSpinner text={`正在进入 第${levelStatus.chapter}回 ...`} />
      </div>
    );
  }

  if (!question) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600 mb-4">谋士今日告假，请稍后再试。</p>
        <button onClick={onBack} className="px-4 py-2 bg-stone-800 text-stone-100 rounded">返回地图</button>
      </div>
    );
  }

  const isBoss = levelStatus.stage === 4;
  const isCorrect = selectedOption === question.correctAnswerIndex;

  return (
    <div className="max-w-2xl mx-auto w-full p-4 animate-fadeIn">
      {/* Header Info */}
      <div className="flex flex-col mb-6 text-stone-600 border-b border-stone-300 pb-4">
        <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
            <Scroll className="w-5 h-5" />
            <span className="font-bold">第 {levelStatus.chapter} 回</span>
            </div>
            <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded text-xs font-bold ${isBoss ? 'bg-red-100 text-red-800' : 'bg-stone-200'}`}>
                {isBoss ? 'BOSS 决战' : `关卡 ${levelStatus.stage}/4`}
            </span>
            </div>
        </div>
        <div className="text-sm font-serif text-stone-800 font-bold opacity-80 leading-tight">
            {getChapterTitle(levelStatus.chapter)}
        </div>
      </div>

      {/* Boss Section */}
      {isBoss && (
        <div className="flex flex-col items-center mb-8 relative">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-amber-600 bg-stone-200 overflow-hidden shadow-xl flex items-center justify-center relative">
            {imageLoading && !bossImage ? (
              <span className="text-xs text-stone-500 animate-pulse text-center px-2">正在召唤 {question.bossCharacter}...</span>
            ) : bossImage ? (
              <img src={bossImage} alt="Boss" className="w-full h-full object-cover" />
            ) : (
              <Sword className="w-12 h-12 text-stone-400" />
            )}
          </div>
          <div className="mt-4 bg-red-900 text-amber-50 px-4 py-1 rounded-full text-sm font-bold shadow-md">
            守关大将：{question.bossCharacter}
          </div>
        </div>
      )}

      {/* Question Card */}
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-stone-200 mb-6">
        <h2 className="text-xl md:text-2xl font-serif font-bold text-stone-800 mb-6 leading-relaxed">
          {question.text}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            let btnClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex justify-between items-center group ";
            
            if (!isAnswered) {
              btnClass += "border-stone-200 hover:border-amber-500 hover:bg-amber-50 cursor-pointer";
            } else {
              if (idx === question.correctAnswerIndex) {
                btnClass += "border-green-500 bg-green-50 text-green-800";
              } else if (idx === selectedOption) {
                btnClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                btnClass += "border-stone-100 text-stone-400 opacity-50";
              }
            }

            return (
              <button 
                key={idx} 
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered}
                className={btnClass}
              >
                <span className="font-medium text-lg">{option}</span>
                {isAnswered && idx === question.correctAnswerIndex && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                {isAnswered && idx === selectedOption && idx !== question.correctAnswerIndex && <XCircle className="w-6 h-6 text-red-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result / Navigation */}
      {isAnswered && (
        <div className={`p-4 rounded-lg mb-20 ${isCorrect ? 'bg-amber-50 border border-amber-200' : 'bg-stone-100 border border-stone-200'}`}>
          <div className="mb-4">
            <h3 className={`font-bold mb-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect ? "回答正确！" : "胜败乃兵家常事"}
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed italic">
              {question.explanation}
            </p>
          </div>
          
          <button 
            onClick={handleNext}
            className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95
              ${isCorrect 
                ? 'bg-stone-800 text-amber-50 hover:bg-stone-700' 
                : 'bg-red-800 text-white hover:bg-red-700'
              }`}
          >
            {isCorrect ? (
              <>乘胜追击 <ArrowRight className="w-4 h-4" /></>
            ) : (
              <>重整旗鼓</>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default GameLevel;
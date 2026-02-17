import React, { useState, useEffect } from 'react';
import { Question, LevelStatus, Difficulty, BossInfo } from '../types';
import { generateLevelQuestion, generateBossAvatar } from '../services/geminiService';
import { getChapterData } from '../chapterData';
import { LoadingSpinner } from './LoadingSpinner';
import { playSound, playBGM, stopBGM } from './SoundManager';
import { Check, X, Sword, Scroll, ArrowRight, Heart, Sparkles, AlertCircle, Shield, Flag } from 'lucide-react';

interface GameLevelProps {
  levelStatus: LevelStatus;
  onComplete: (success: boolean) => void;
  onBack: () => void;
}

const GameLevel: React.FC<GameLevelProps> = ({ levelStatus, onComplete, onBack }) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [bossInfo, setBossInfo] = useState<BossInfo | null>(null);
  const [bossImage, setBossImage] = useState<string | null>(null);
  
  // Use -1 to indicate uninitialized HP to avoid confusion with 1 HP remaining
  const [bossHP, setBossHP] = useState(-1);
  const [maxBossHP, setMaxBossHP] = useState(-1);
  
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  
  // Effects
  const [shake, setShake] = useState(false);
  const [flash, setFlash] = useState(false);
  
  // Power-ups
  const [hintUsed, setHintUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [reinforcementUsed, setReinforcementUsed] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);

  // Defeat Modal
  const [showDefeatModal, setShowDefeatModal] = useState(false);

  const isBoss = levelStatus.stage === 4;

  const getDifficulty = (): Difficulty => {
    if (isBoss) return Difficulty.HARD;
    if (levelStatus.chapter > 80) return Difficulty.VERY_HARD;
    if (levelStatus.chapter > 40) return Difficulty.NORMAL;
    return Difficulty.EASY;
  };

  useEffect(() => {
    playBGM(isBoss);
    return () => stopBGM();
  }, [isBoss]);

  useEffect(() => {
    const initLevel = async () => {
      setLoading(true);
      setQuestion(null);
      setSelectedOption(null);
      setIsAnswered(false);
      
      // Reset Power-ups
      setHintUsed(false);
      setShowHint(false);
      setReinforcementUsed(false);
      setEliminatedOptions([]);

      try {
        let currentBoss: BossInfo | undefined;

        if (isBoss) {
            const chapterData = getChapterData(levelStatus.chapter);
            currentBoss = chapterData.boss;
            setBossInfo(currentBoss);
            
            if (bossHP === -1) { 
                setBossHP(currentBoss.hp);
                setMaxBossHP(currentBoss.hp);
                return; 
            }

            const cacheKey = `boss_img_chap_${levelStatus.chapter}`;
            const cachedImage = localStorage.getItem(cacheKey);

            if (cachedImage) {
                setBossImage(cachedImage);
            } else if (!bossImage && !imageLoading) {
                setImageLoading(true);
                generateBossAvatar(currentBoss.visualPrompt).then(img => {
                    if (img) {
                        setBossImage(img);
                        try { localStorage.setItem(cacheKey, img); } catch (e) {}
                    }
                    setImageLoading(false);
                });
            }
        }

        const q = await generateLevelQuestion(
          levelStatus.chapter, 
          levelStatus.stage, 
          getDifficulty(),
          currentBoss
        );
        setQuestion(q);
        setLoading(false);

      } catch (e) {
        console.error("Error loading level", e);
        setLoading(false);
      }
    };

    initLevel();
  }, [levelStatus, bossHP]);

  const handleOptionClick = (index: number) => {
    if (isAnswered || eliminatedOptions.includes(index)) return;
    playSound('click');
    setSelectedOption(index);
    setIsAnswered(true);

    const correct = index === question?.correctAnswerIndex;

    if (correct) {
        playSound('correct');
        if (isBoss) {
            setShake(true);
            setFlash(true);
            playSound('hit');
            setTimeout(() => {
                setShake(false);
                setFlash(false);
            }, 500);
        }
    } else {
        playSound('wrong');
    }
  };

  const handleNext = () => {
    if (question && selectedOption === question.correctAnswerIndex) {
      if (isBoss) {
          const newHP = bossHP - 1;
          if (newHP <= 0) {
              playSound('win');
              setShowDefeatModal(true);
          } else {
              setBossHP(newHP);
              setLoading(true); 
          }
      } else {
          onComplete(true);
      }
    } else {
      if (isBoss && bossInfo) {
          setBossHP(bossInfo.hp);
      }
      onComplete(false);
    }
  };

  const useHint = () => {
      if (!hintUsed && !isAnswered) {
          setHintUsed(true);
          setShowHint(true);
          playSound('click');
      }
  }

  const useReinforcement = () => {
      if (!reinforcementUsed && !isAnswered && question) {
          setReinforcementUsed(true);
          playSound('click');
          
          // Find invalid options
          const invalidIndices = question.options
            .map((_, idx) => idx)
            .filter(idx => idx !== question.correctAnswerIndex);
          
          // Pick one random invalid option to eliminate
          if (invalidIndices.length > 0) {
              const randomIndex = Math.floor(Math.random() * invalidIndices.length);
              setEliminatedOptions([invalidIndices[randomIndex]]);
          }
      }
  }

  // Defeat Modal (Victory Screen)
  if (showDefeatModal && bossInfo) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-fadeIn">
            <div className="relative bg-[#3E2723] border-4 border-[#FFB300] rounded-2xl max-w-lg w-full p-8 text-center shadow-[0_0_50px_rgba(255,179,0,0.5)] overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
                
                <h2 className="text-5xl md:text-6xl font-calligraphy text-[#FFB300] mb-8 animate-bounce drop-shadow-md">
                    讨伐成功
                </h2>
                
                <div className="relative w-40 h-40 mx-auto mb-8">
                    <div className="absolute inset-0 bg-[#FFB300] rounded-full animate-ping opacity-20"></div>
                    <div className="w-full h-full rounded-full border-4 border-[#FFB300] bg-white overflow-hidden relative z-10 grayscale">
                        <img src={bossImage || ''} className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="bg-[#5D4037] p-4 rounded-xl border border-[#8D6E63] mb-8">
                     <p className="text-[#FFE0B2] font-serif text-xl italic leading-relaxed">
                        “{bossInfo.defeatQuote}”
                    </p>
                </div>
               
                <button 
                    onClick={() => onComplete(true)}
                    className="btn-game w-full py-4 text-xl font-bold bg-[#FFB300] text-[#3E2723] border-[#FFA000] hover:brightness-110"
                >
                    凯旋班师
                </button>
            </div>
        </div>
      );
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner text={isBoss ? "两军对垒，正在寻找战机..." : `正在进入 第${levelStatus.chapter}回 ...`} />
      </div>
    );
  }

  if (!question) {
    return (
      <div className="text-center p-8">
        <button onClick={onBack} className="btn-game px-6 py-2">返回地图</button>
      </div>
    );
  }

  const chapterTitle = getChapterData(levelStatus.chapter).title;
  const isCorrect = selectedOption === question.correctAnswerIndex;

  return (
    <div className={`max-w-2xl mx-auto w-full p-4 animate-fadeIn ${shake ? 'animate-shake' : ''}`}>
      <style>{`
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.3s cubic-bezier(.36,.07,.19,.97) both; }
        .boss-hit { filter: sepia(100%) saturate(300%) hue-rotate(-50deg) brightness(1.5); }
      `}</style>

      {/* Header Info - Light Wood Style */}
      <div className="bg-[#795548] text-[#FFF8E1] rounded-xl p-3 shadow-md border-b-4 border-[#5D4037] mb-6 flex justify-between items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
        <div className="z-10 flex items-center gap-3">
             <div className="w-10 h-10 bg-[#5D4037] rounded-lg flex items-center justify-center border border-[#8D6E63] shadow-inner">
                <span className="font-calligraphy text-xl text-[#FFB300]">{levelStatus.chapter}</span>
             </div>
             <div>
                 <div className="text-[10px] text-[#D7CCC8] uppercase tracking-wider font-bold">Chapter</div>
                 <div className="font-bold text-sm truncate max-w-[150px] md:max-w-xs">{chapterTitle}</div>
             </div>
        </div>
        <div className="z-10">
            <span className={`px-3 py-1 rounded text-xs font-bold border shadow-sm ${isBoss ? 'bg-[#D32F2F] border-[#B71C1C] text-white' : 'bg-[#FFF8E1] border-[#FFB300] text-[#795548]'}`}>
                {isBoss ? 'BOSS WAR' : `STAGE ${levelStatus.stage}/4`}
            </span>
        </div>
      </div>

      {/* Boss Section - Refined Frame */}
      {isBoss && bossInfo && (
        <div className={`flex flex-col items-center mb-6 relative transition-all duration-200 ${flash ? 'scale-105' : ''}`}>
           {/* HP Bar Container */}
           <div className="absolute -top-3 z-20 flex gap-2 bg-[#3E2723] px-4 py-1.5 rounded-full border-2 border-[#5D4037] shadow-lg">
                {Array.from({length: maxBossHP > 0 ? maxBossHP : 0}).map((_, i) => (
                    <div key={i} className="relative w-6 h-6 flex items-center justify-center">
                        <Heart 
                            className={`w-full h-full drop-shadow-md transition-all duration-500 ${i < bossHP ? 'text-[#F4511E] fill-[#F4511E]' : 'text-[#5D4037] fill-[#4E342E]'}`} 
                        />
                    </div>
                ))}
           </div>

           <div className={`
                relative w-48 h-48 rounded-full border-8 border-[#FFB300] bg-white overflow-hidden shadow-2xl
                ${flash ? 'boss-hit border-[#F4511E]' : ''}
           `}>
               {imageLoading && !bossImage ? (
                  <div className="w-full h-full flex items-center justify-center bg-[#EFEBE9]">
                      <Sword className="w-12 h-12 text-[#BCAAA4] animate-pulse" />
                  </div>
                ) : bossImage ? (
                  <img src={bossImage} alt="Boss" className="w-full h-full object-cover" />
                ) : null}
                
                {/* Boss Name Tag */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#3E2723]/80 px-4 py-0.5 rounded-full border border-[#FFB300]/50 backdrop-blur-md">
                     <span className="text-[#FFB300] font-bold text-sm whitespace-nowrap">{bossInfo.name}</span>
                </div>
           </div>

           {/* Quote Bubble */}
           <div className="mt-4 bg-white p-3 rounded-xl rounded-tr-none border-2 border-[#D7CCC8] shadow-sm max-w-xs text-center relative after:content-[''] after:absolute after:-top-[14px] after:right-[50%] after:border-[8px] after:border-transparent after:border-b-[#D7CCC8]">
                <p className="text-[#5D4037] text-xs italic font-serif">“{bossInfo.description}”</p>
           </div>
        </div>
      )}

      {/* Question Card - Light Paper Scroll Style */}
      <div className="scroll-bg p-6 md:p-8 mb-6 text-[#3E2723]">
        <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl md:text-2xl font-bold font-serif leading-relaxed text-shadow flex-1">
            {question.text}
            </h2>
             
             {/* Power-up Buttons */}
            {!isAnswered && (
                <div className="flex gap-2 ml-2">
                    {/* Reinforcement */}
                    <button 
                        onClick={useReinforcement} 
                        disabled={reinforcementUsed}
                        className={`shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all shadow-sm ${reinforcementUsed ? 'bg-[#EFEBE9] border-[#D7CCC8] text-[#BCAAA4]' : 'bg-[#FFEBEE] border-[#FFCDD2] text-[#D32F2F] hover:scale-110 active:scale-95'}`}
                        title="请求援军 (排除一个错误答案)"
                    >
                        <Flag className="w-5 h-5" />
                    </button>
                    {/* Hint */}
                    <button 
                        onClick={useHint} 
                        disabled={hintUsed}
                        className={`shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all shadow-sm ${hintUsed ? 'bg-[#EFEBE9] border-[#D7CCC8] text-[#BCAAA4]' : 'bg-[#E3F2FD] border-[#90CAF9] text-[#1976D2] hover:scale-110 active:scale-95'}`}
                        title="锦囊妙计 (查看提示)"
                    >
                        <Sparkles className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
        
        {showHint && (
            <div className="mb-6 p-3 bg-[#E3F2FD]/50 border border-[#90CAF9] rounded text-[#1565C0] text-sm flex gap-3 animate-fadeIn items-start">
                <div className="bg-[#BBDEFB] p-1 rounded-full"><AlertCircle className="w-4 h-4" /></div>
                <div className="flex-1">
                    <span className="font-bold block text-[#1976D2] text-xs mb-1">孔明观星</span>
                    {question.hint}
                </div>
            </div>
        )}

        <div className="space-y-4">
          {question.options.map((option, idx) => {
            const isEliminated = eliminatedOptions.includes(idx);
            
            // Colors for options
            let stateClass = "border-[#BCAAA4] bg-white text-[#5D4037] hover:-translate-y-1 hover:border-[#8D6E63] hover:shadow-md";
            let icon = <div className="w-6 h-6 rounded-full border-2 border-[#D7CCC8] text-[#A1887F] flex items-center justify-center text-xs font-bold">{String.fromCharCode(65+idx)}</div>;
            
            if (isEliminated) {
                stateClass = "border-[#E0E0E0] bg-[#F5F5F5] text-[#BDBDBD] opacity-60 cursor-not-allowed";
                icon = <div className="w-6 h-6 rounded-full border-2 border-[#E0E0E0] text-[#BDBDBD] flex items-center justify-center text-xs"><X className="w-3 h-3" /></div>;
            } else if (isAnswered) {
              if (idx === question.correctAnswerIndex) {
                // Vibrant Green for correct
                stateClass = "border-[#66BB6A] bg-[#E8F5E9] text-[#2E7D32] ring-2 ring-[#66BB6A]";
                icon = <div className="w-6 h-6 rounded-full bg-[#66BB6A] text-white flex items-center justify-center"><Check className="w-4 h-4" /></div>;
              } else if (idx === selectedOption) {
                // Vibrant Orange/Red for wrong
                stateClass = "border-[#FF5722] bg-[#FBE9E7] text-[#D84315]";
                icon = <div className="w-6 h-6 rounded-full bg-[#FF5722] text-white flex items-center justify-center"><X className="w-4 h-4" /></div>;
              } else {
                stateClass = "opacity-50 border-[#E0E0E0] grayscale bg-[#FAFAFA]";
              }
            }

            return (
              <button 
                key={idx} 
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered || isEliminated}
                className={`
                    w-full min-h-[60px] text-left p-4 rounded-lg border-b-4 transition-all duration-100 flex items-center gap-4 relative overflow-hidden
                    ${stateClass}
                `}
              >
                {icon}
                <span className={`font-medium text-lg font-serif ${isEliminated ? 'line-through decoration-2 decoration-[#BDBDBD]' : ''}`}>{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result / Navigation */}
      {isAnswered && (
        <div className={`p-5 rounded-xl mb-24 animate-slideUp shadow-xl border-l-4 ${isCorrect ? 'bg-[#E8F5E9] border-[#66BB6A]' : 'bg-[#FBE9E7] border-[#FF5722]'}`}>
          <div className="mb-4">
            <h3 className={`font-bold text-lg mb-2 flex items-center gap-2 ${isCorrect ? 'text-[#2E7D32]' : 'text-[#D84315]'}`}>
              {isCorrect ? <Shield className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              {isCorrect ? "回答正确！" : "胜败乃兵家常事"}
            </h3>
            <p className="text-[#4E342E] text-sm leading-relaxed italic border-t border-[#3E2723]/10 pt-2">
              {question.explanation}
            </p>
          </div>
          
          <button 
            onClick={handleNext}
            className={`
                w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 text-lg
                ${isCorrect 
                    ? 'btn-game text-[#3E2723] bg-[#FFF8E1] border-[#FFB300]' 
                    : 'bg-[#FF5722] text-white border-b-4 border-[#BF360C] hover:bg-[#F4511E]'
                }
            `}
          >
            {isCorrect ? (
              <>{isBoss && bossHP > 1 ? "继续交战" : "乘胜追击"} <ArrowRight className="w-5 h-5" /></>
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
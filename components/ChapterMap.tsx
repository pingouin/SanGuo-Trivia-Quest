import React from 'react';
import { LevelStatus, TOTAL_CHAPTERS, GameMode } from '../types';
import { getChapterTitle } from '../chapterData';
import { Lock, Unlock } from 'lucide-react';

interface ChapterMapProps {
  maxUnlocked: LevelStatus;
  gameMode: GameMode;
  onSelectLevel: (chapter: number) => void;
}

const ChapterMap: React.FC<ChapterMapProps> = ({ maxUnlocked, gameMode, onSelectLevel }) => {
  const chapters = Array.from({ length: TOTAL_CHAPTERS }, (_, i) => i + 1);

  // Helper to get cached boss image for background
  const getBossBg = (chapter: number) => {
      return localStorage.getItem(`boss_img_chap_${chapter}`);
  }

  // Convert number to Chinese numeral for chapters (1-120)
  const toChineseNumeral = (n: number): string => {
    const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    if (n <= 10) return n === 10 ? '十' : digits[n];
    if (n < 20) return '十' + digits[n % 10];
    if (n < 100) {
        return digits[Math.floor(n / 10)] + '十' + (n % 10 === 0 ? '' : digits[n % 10]);
    }
    // 100+
    const rest = n % 100;
    let str = '一百';
    if (rest === 0) return str;
    if (rest < 10) return str + '零' + digits[rest];
    return str + toChineseNumeral(rest);
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 pb-20">
      {/* Chapters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {chapters.map((chap) => {
          // Logic: 
          // If Free Mode: All unlocked.
          // If Story Mode: Unlocked if <= maxUnlocked.chapter.
          const isUnlocked = gameMode === 'free' || chap <= maxUnlocked.chapter;
          
          // Completed logic only really applies to Story Mode for visuals, 
          // or we can say "completed" if it is strictly less than max unlocked in story mode.
          // In free mode, we don't strictly track "completion" visually as clearly, or we could just not show "Cleared".
          // Let's keep it simple: Show 'Cleared' only in story mode for passed levels.
          const isCompleted = gameMode === 'story' && chap < maxUnlocked.chapter;
          const isCurrent = gameMode === 'story' && chap === maxUnlocked.chapter;
          
          const title = getChapterTitle(chap);
          const titleParts = title.split(' ');
          const line1 = titleParts[0] || title;
          const line2 = titleParts[1] || '';

          const bgImage = getBossBg(chap);
          const chineseNum = toChineseNumeral(chap);
          
          return (
            <button
              key={chap}
              onClick={() => isUnlocked && onSelectLevel(chap)}
              disabled={!isUnlocked}
              className={`
                relative min-h-[200px] flex flex-col items-center justify-between p-1 transition-all duration-300 group
                ${isUnlocked ? 'cursor-pointer hover:-translate-y-1' : 'cursor-not-allowed opacity-80 grayscale-[0.5]'}
              `}
            >
              {/* Card Container Styling */}
              <div className={`
                absolute inset-0 rounded-xl border-2 shadow-[0_4px_0_rgba(62,39,35,0.15)]
                ${isCurrent 
                    ? 'bg-[#FFF8E1] border-[#FFB300] shadow-[#FFB300]/40 ring-2 ring-[#FFB300]/50' 
                    : isCompleted 
                        ? 'bg-[#E8F5E9] border-[#66BB6A]' 
                        : 'bg-[#EFEBE9] border-[#BCAAA4]' 
                }
              `}></div>

              {/* Background Image Overlay */}
              {isUnlocked && bgImage && (
                  <div className="absolute inset-0 m-0.5 rounded-lg overflow-hidden opacity-20 group-hover:opacity-40 transition-opacity">
                      <img src={bgImage} className="w-full h-full object-cover blur-[0.5px]" />
                  </div>
              )}

              {/* Content */}
              <div className="z-10 w-full h-full flex flex-col justify-between p-3 relative">
                 {/* Top Status Bar */}
                 <div className="flex justify-between items-start mb-2 w-full">
                    {/* Chinese Numeral Seal */}
                    <div className={`
                        min-w-[2rem] px-2 h-8 flex items-center justify-center rounded-lg text-sm font-bold border-2 shrink-0 shadow-sm font-calligraphy tracking-widest
                        ${isCurrent 
                            ? 'bg-[#FFB300] border-[#FF6F00] text-[#3E2723]' 
                            : 'bg-[#D7CCC8] border-[#A1887F] text-[#5D4037]'
                        }
                    `}>
                        {chineseNum}
                    </div>
                    <div className="mt-1">
                        {isUnlocked ? (
                             isCompleted ? <div className="text-[#2E7D32] font-bold text-[10px] bg-[#C8E6C9] px-2 py-0.5 rounded-full border border-[#81C784]">已破</div> : <Unlock className="w-4 h-4 text-[#F57F17]" />
                        ) : <Lock className="w-4 h-4 text-[#9E9E9E]" />}
                    </div>
                 </div>

                 {/* Two-Line Title Display */}
                 <div className={`
                    flex-grow flex flex-col items-center justify-center py-2 text-center w-full
                    ${isCurrent ? 'text-[#3E2723]' : 'text-[#795548]'}
                 `}>
                    <div className="font-calligraphy text-lg md:text-xl leading-tight mb-1">{line1}</div>
                    <div className="font-calligraphy text-lg md:text-xl leading-tight">{line2}</div>
                 </div>

                 {/* Bottom Marker */}
                 <div className="flex justify-center h-6 items-center">
                    {isCurrent && (
                        <div className="text-[10px] bg-[#F4511E] text-white px-2 py-0.5 rounded-full animate-pulse shadow-sm border border-[#D84315]">
                            当前战役
                        </div>
                    )}
                 </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChapterMap;
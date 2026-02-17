import React from 'react';
import { LevelStatus, TOTAL_CHAPTERS } from '../types';
import { getChapterTitle } from '../chapterData';
import { Lock, Unlock, Map } from 'lucide-react';

interface ChapterMapProps {
  maxUnlocked: LevelStatus;
  onSelectLevel: (chapter: number) => void;
}

const ChapterMap: React.FC<ChapterMapProps> = ({ maxUnlocked, onSelectLevel }) => {
  const chapters = Array.from({ length: TOTAL_CHAPTERS }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-stone-800 flex items-center justify-center gap-3">
          <Map className="w-8 h-8 text-amber-700" />
          三国演义 • 征途
        </h2>
        <p className="text-stone-500 mt-2 font-serif">滚滚长江东逝水，浪花淘尽英雄</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {chapters.map((chap) => {
          const isUnlocked = chap <= maxUnlocked.chapter;
          const isCompleted = chap < maxUnlocked.chapter;
          const isCurrent = chap === maxUnlocked.chapter;
          const title = getChapterTitle(chap);
          // Split title into two lines if it contains a space (common in couplet titles)
          const titleParts = title.split(' ');
          
          return (
            <button
              key={chap}
              onClick={() => isUnlocked && onSelectLevel(chap)}
              disabled={!isUnlocked}
              className={`
                min-h-[140px] rounded-lg border-2 flex flex-col items-center justify-between p-3 transition-all duration-300 relative overflow-hidden group
                ${isCurrent 
                  ? 'border-amber-600 bg-amber-50 shadow-lg scale-105 ring-2 ring-amber-200 ring-offset-2' 
                  : isCompleted 
                    ? 'border-stone-400 bg-stone-100 opacity-90 hover:opacity-100' 
                    : 'border-stone-200 bg-stone-200 opacity-60 cursor-not-allowed grayscale'
                }
              `}
            >
              <div className="w-full flex justify-between items-start">
                  <span className={`text-xs font-bold uppercase ${isCurrent ? 'text-amber-800' : 'text-stone-500'}`}>
                    第{chap}回
                  </span>
                  <div className="">
                    {isUnlocked ? (
                    <Unlock className={`w-3 h-3 ${isCurrent ? 'text-amber-600' : 'text-stone-400'}`} />
                    ) : (
                    <Lock className="w-3 h-3 text-stone-400" />
                    )}
                </div>
              </div>
              
              <div className={`text-sm font-serif font-bold text-center leading-snug my-2 ${isCurrent ? 'text-stone-900' : 'text-stone-500'}`}>
                {titleParts.map((part, i) => (
                    <div key={i}>{part}</div>
                ))}
              </div>
              
              <div className="w-full">
                  {/* Spacer or status indicator */}
                  {isCurrent && (
                     <div className="h-1 w-full bg-amber-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-600 animate-pulse w-1/2"></div>
                     </div>
                  )}
              </div>

              {isCurrent && (
                <div className="absolute top-0 right-0 p-1">
                   <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChapterMap;
import React, { useState, useEffect } from 'react';
import { LevelStatus, PlayerState } from './types';
import ChapterMap from './components/ChapterMap';
import GameLevel from './components/GameLevel';
import { Scroll } from 'lucide-react';

const STORAGE_KEY = 'sangou_trivia_save_v1';

const INITIAL_STATE: PlayerState = {
  currentLevel: { chapter: 1, stage: 1 },
  maxUnlockedLevel: { chapter: 1, stage: 1 },
  lives: 3
};

export default function App() {
  const [gameState, setGameState] = useState<PlayerState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  const [view, setView] = useState<'map' | 'game'>('map');
  const [activeLevel, setActiveLevel] = useState<LevelStatus | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  // Handle entering a chapter from the map
  const handleSelectChapter = (chapter: number) => {
    if (chapter === gameState.maxUnlockedLevel.chapter) {
      setActiveLevel(gameState.maxUnlockedLevel);
    } else {
      setActiveLevel({ chapter, stage: 1 });
    }
    setView('game');
  };

  const handleLevelComplete = (success: boolean) => {
    if (!activeLevel) return;

    if (success) {
      let nextStage = activeLevel.stage + 1;
      let nextChapter = activeLevel.chapter;

      if (nextStage > 4) {
        nextStage = 1;
        nextChapter += 1;
      }

      const nextLevelStatus = { chapter: nextChapter, stage: nextStage };

      if (
        activeLevel.chapter === gameState.maxUnlockedLevel.chapter && 
        activeLevel.stage === gameState.maxUnlockedLevel.stage
      ) {
        setGameState(prev => ({
          ...prev,
          maxUnlockedLevel: nextLevelStatus,
          currentLevel: nextLevelStatus
        }));
      }

      setActiveLevel(nextLevelStatus);
    } else {
      setActiveLevel({ ...activeLevel }); 
    }
  };

  const handleBackToMap = () => {
    setView('map');
    setActiveLevel(null);
  };

  const resetProgress = () => {
    if(confirm("确定要重置所有进度吗？")) {
        setGameState(INITIAL_STATE);
        setView('map');
    }
  }

  // Format: 1-1, 1-2, 1-3, 1-BOSS
  const getProgressDisplay = () => {
      const { chapter, stage } = gameState.maxUnlockedLevel;
      const stageText = stage === 4 ? 'BOSS' : stage;
      return `${chapter}-${stageText}`;
  };

  return (
    <div className="min-h-screen text-[#3E2723] flex flex-col font-serif">
      {/* Navbar - Changed from dark grey to warm wood/sandalwood */}
      <header className="bg-[#5D4037] text-[#FFF8E1] p-3 shadow-lg sticky top-0 z-50 border-b-4 border-[#FFB300]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('map')}>
            <div className="relative">
                <div className="absolute inset-0 bg-[#FFB300] rotate-45 rounded-sm group-hover:rotate-90 transition-transform duration-500"></div>
                <div className="relative bg-[#3E2723] p-1.5 rounded-sm border border-[#FFB300] z-10">
                    <Scroll className="w-5 h-5 text-[#FFF8E1]" />
                </div>
            </div>
            <div>
                <h1 className="font-calligraphy text-2xl tracking-wide text-shadow-dark">三国智谋传</h1>
            </div>
          </div>
          
          <div className="hidden md:block text-xs font-bold text-[#5D4037] bg-[#FFECB3] px-4 py-1.5 rounded-full border-2 border-[#FFA000] shadow-sm">
             当前进度: {getProgressDisplay()}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center w-full">
        {view === 'map' && (
          <div className="w-full">
            <ChapterMap 
              maxUnlocked={gameState.maxUnlockedLevel} 
              onSelectLevel={handleSelectChapter} 
            />
            <div className="text-center mt-12 mb-8">
                <button onClick={resetProgress} className="text-xs text-[#8D6E63] underline hover:text-[#F4511E] transition-colors">重置游戏进度</button>
            </div>
          </div>
        )}

        {view === 'game' && activeLevel && (
          <GameLevel 
            levelStatus={activeLevel} 
            onComplete={handleLevelComplete}
            onBack={handleBackToMap}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#4E342E] text-[#D7CCC8] text-center p-6 text-xs border-t-4 border-[#3E2723]">
        <p className="mb-2 font-bold tracking-widest text-[#FFECB3]">ROMANCE OF THE THREE KINGDOMS</p>
        <p className="opacity-75">Powered by Google Gemini 2.5 & 3.0</p>
      </footer>
    </div>
  );
}
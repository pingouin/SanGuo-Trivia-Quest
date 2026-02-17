import React, { useState, useEffect } from 'react';
import { LevelStatus, PlayerState, GameMode } from './types';
import ChapterMap from './components/ChapterMap';
import GameLevel from './components/GameLevel';
import { Scroll, Sword, Map as MapIcon } from 'lucide-react';

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

  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [view, setView] = useState<'map' | 'game'>('map');
  const [activeLevel, setActiveLevel] = useState<LevelStatus | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  // Handle entering a chapter from the map
  const handleSelectChapter = (chapter: number) => {
    // Logic depends on mode slightly, but mostly we just set the active level
    // In Story mode, we might resume progress, but clicking a chapter usually means starting that chapter.
    // However, if they click the furthest unlocked chapter in story mode, we might want to resume the specific stage.
    
    if (gameMode === 'story' && chapter === gameState.maxUnlockedLevel.chapter) {
      setActiveLevel(gameState.maxUnlockedLevel);
    } else {
      setActiveLevel({ chapter, stage: 1 });
    }
    setView('game');
  };

  const handleLevelComplete = (success: boolean) => {
    if (!activeLevel) return;

    if (success) {
      const isBossLevel = activeLevel.stage === 4;
      
      let nextStage = activeLevel.stage + 1;
      let nextChapter = activeLevel.chapter;

      if (nextStage > 4) {
        nextStage = 1;
        nextChapter += 1;
      }

      const nextLevelStatus = { chapter: nextChapter, stage: nextStage };

      // Only update progress in Story Mode
      if (gameMode === 'story') {
        // Only advance max unlocked if we just beat the current max level
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
      }

      if (isBossLevel) {
          // Return to map after defeating boss
          setActiveLevel(null);
          setView('map');
      } else {
          // Immediately continue to next stage within the chapter
          setActiveLevel(nextLevelStatus);
      }
      
    } else {
      // Failed: Reload current level (using key prop to force remount)
      setActiveLevel({ ...activeLevel }); 
    }
  };

  const handleBackToMap = () => {
    setView('map');
    setActiveLevel(null);
  };

  const handleBackToTitle = () => {
      setGameMode(null);
      setView('map');
      setActiveLevel(null);
  };

  const resetProgress = () => {
    if(confirm("确定要重置所有进度吗？")) {
        setGameState(INITIAL_STATE);
        // Don't change view, just reset state
    }
  }

  // Format: 1-1, 1-2, 1-3, 1-BOSS
  const getProgressDisplay = () => {
      const { chapter, stage } = gameState.maxUnlockedLevel;
      const stageText = stage === 4 ? 'BOSS' : stage;
      return `${chapter}-${stageText}`;
  };

  // --- Title / Mode Selection Screen ---
  if (!gameMode) {
      return (
        <div className="min-h-screen text-[#3E2723] flex flex-col font-serif items-center justify-center p-4 relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute inset-0 bg-[#FFF8E1] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] -z-20"></div>
             <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FFB300] to-transparent"></div>
             
             <div className="text-center mb-12 animate-fadeIn">
                 <div className="inline-block p-4 rounded-full border-4 border-[#3E2723] bg-[#FFB300] mb-6 shadow-xl">
                     <Scroll className="w-16 h-16 text-[#3E2723]" />
                 </div>
                 <h1 className="font-calligraphy text-6xl md:text-7xl text-[#3E2723] mb-4 text-shadow-dark tracking-wider">三国智谋传</h1>
                 <p className="text-[#795548] font-serif italic text-lg tracking-widest">ROMANCE OF THE THREE KINGDOMS</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
                 {/* Story Mode Card */}
                 <button 
                    onClick={() => setGameMode('story')}
                    className="group relative bg-[#5D4037] text-[#FFF8E1] p-8 rounded-2xl border-4 border-[#8D6E63] shadow-[0_8px_0_#3E2723] hover:translate-y-1 hover:shadow-[0_4px_0_#3E2723] active:translate-y-2 active:shadow-none transition-all text-left overflow-hidden"
                 >
                     <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                         <Sword className="w-32 h-32" />
                     </div>
                     <div className="relative z-10">
                         <h2 className="text-3xl font-calligraphy text-[#FFB300] mb-2 group-hover:scale-105 transition-transform origin-left">一路过关</h2>
                         <p className="text-[#D7CCC8] text-sm mb-4">从第一回开始，过关斩将，体验完整的历史进程。</p>
                         <div className="inline-block bg-[#3E2723]/50 px-3 py-1 rounded text-xs border border-[#FFB300]/30">
                            当前进度: {gameState.maxUnlockedLevel.chapter} 回
                         </div>
                     </div>
                 </button>

                 {/* Free Mode Card */}
                 <button 
                    onClick={() => setGameMode('free')}
                    className="group relative bg-[#FFF8E1] text-[#3E2723] p-8 rounded-2xl border-4 border-[#FFB300] shadow-[0_8px_0_#F57F17] hover:translate-y-1 hover:shadow-[0_4px_0_#F57F17] active:translate-y-2 active:shadow-none transition-all text-left overflow-hidden"
                 >
                     <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                         <MapIcon className="w-32 h-32" />
                     </div>
                     <div className="relative z-10">
                         <h2 className="text-3xl font-calligraphy text-[#F4511E] mb-2 group-hover:scale-105 transition-transform origin-left">自由选关</h2>
                         <p className="text-[#5D4037] text-sm mb-4">纵览天下，任意挑战一百二十回中的任何战役。</p>
                         <div className="inline-block bg-[#FFB300]/20 px-3 py-1 rounded text-xs border border-[#F4511E]/30">
                            全章节解锁
                         </div>
                     </div>
                 </button>
             </div>

             <div className="mt-12 text-[#8D6E63] text-xs opacity-60">
                 v1.1 | Powered by Google Gemini
             </div>
        </div>
      );
  }

  // --- Main Game Loop ---
  return (
    <div className="min-h-screen text-[#3E2723] flex flex-col font-serif">
      {/* Navbar */}
      <header className="bg-[#5D4037] text-[#FFF8E1] p-3 shadow-lg sticky top-0 z-50 border-b-4 border-[#FFB300]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={handleBackToMap}>
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
          
          <div className="flex items-center gap-4">
            {gameMode === 'story' && (
                <div className="hidden md:block text-xs font-bold text-[#5D4037] bg-[#FFECB3] px-4 py-1.5 rounded-full border-2 border-[#FFA000] shadow-sm">
                    进度: {getProgressDisplay()}
                </div>
            )}
            <button onClick={handleBackToTitle} className="text-xs text-[#FFB300] hover:text-white underline">
                返回标题
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center w-full">
        {view === 'map' && (
          <div className="w-full">
            <div className="max-w-5xl mx-auto px-4 mt-6 mb-2">
                <h2 className="font-calligraphy text-3xl text-[#3E2723] border-l-8 border-[#F4511E] pl-4">
                    {gameMode === 'story' ? '过关斩将' : '自由演义'}
                </h2>
                <p className="text-[#795548] text-sm mt-1 pl-6 opacity-80">
                    {gameMode === 'story' ? '循序渐进，重走三国路。' : '天高海阔，任君驰骋。'}
                </p>
            </div>
            <ChapterMap 
              gameMode={gameMode}
              maxUnlocked={gameState.maxUnlockedLevel} 
              onSelectLevel={handleSelectChapter} 
            />
            {gameMode === 'story' && (
                <div className="text-center mt-12 mb-8">
                    <button onClick={resetProgress} className="text-xs text-[#8D6E63] underline hover:text-[#F4511E] transition-colors">重置游戏进度</button>
                </div>
            )}
          </div>
        )}

        {view === 'game' && activeLevel && (
          <GameLevel 
            key={`${activeLevel.chapter}-${activeLevel.stage}`} 
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
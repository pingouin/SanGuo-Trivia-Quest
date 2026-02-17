import React, { useState, useEffect } from 'react';
import { LevelStatus, PlayerState } from './types';
import ChapterMap from './components/ChapterMap';
import GameLevel from './components/GameLevel';
import { BookOpen } from 'lucide-react';

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
    // If selecting the current max unlocked chapter, resume where we left off
    if (chapter === gameState.maxUnlockedLevel.chapter) {
      setActiveLevel(gameState.maxUnlockedLevel);
    } else {
      // Replaying an old chapter starts at stage 1
      setActiveLevel({ chapter, stage: 1 });
    }
    setView('game');
  };

  const handleLevelComplete = (success: boolean) => {
    if (!activeLevel) return;

    if (success) {
      // Logic for progression
      let nextStage = activeLevel.stage + 1;
      let nextChapter = activeLevel.chapter;

      // If finished boss (stage 4)
      if (nextStage > 4) {
        nextStage = 1;
        nextChapter += 1;
      }

      const nextLevelStatus = { chapter: nextChapter, stage: nextStage };

      // Update Max Unlocked if we just beat the furthest level
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

      // Move player to next stage immediately
      setActiveLevel(nextLevelStatus);
      
      // If we just finished a chapter (beat boss), maybe go back to map or show celebration?
      // For now, let's keep playing but allow user to exit.
    } else {
      // Failed: Reload current level (generates new question)
      // Trigger a slight delay or effect could be added here
      setActiveLevel({ ...activeLevel }); // Force re-render/re-fetch
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

  return (
    <div className="min-h-screen text-stone-800 flex flex-col">
      {/* Navbar */}
      <header className="bg-stone-900 text-amber-50 p-4 shadow-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('map')}>
            <div className="bg-amber-600 p-1.5 rounded">
                <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-serif font-bold text-lg md:text-xl tracking-wide">三国智谋传</h1>
          </div>
          
          <div className="text-xs md:text-sm text-stone-400">
             当前进度: 第{gameState.maxUnlockedLevel.chapter}回 - {gameState.maxUnlockedLevel.stage === 4 ? '决战' : `关卡${gameState.maxUnlockedLevel.stage}`}
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
                <button onClick={resetProgress} className="text-xs text-stone-400 underline hover:text-red-500">重置游戏进度</button>
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
      <footer className="bg-stone-200 text-stone-500 text-center p-4 text-xs">
        <p>Powered by Google Gemini 2.5 & 3.0 • 三国演义问答 RPG</p>
      </footer>
    </div>
  );
}
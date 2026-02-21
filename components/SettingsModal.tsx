
import React from 'react';
import { QuestionSource } from '../types';
import { X, Sparkles, BookOpen, Settings, BarChart } from 'lucide-react';
import { getBankStats } from '../services/localBankService';

interface SettingsModalProps {
  currentSource: QuestionSource;
  onUpdateSource: (source: QuestionSource) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ currentSource, onUpdateSource, onClose }) => {
  const stats = getBankStats();
  const totalStages = 120 * 3;
  const progressPercent = Math.min(100, Math.round((stats.unlockedStages / totalStages) * 100));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="relative bg-[#FFF8E1] border-4 border-[#5D4037] rounded-2xl max-w-md w-full p-6 shadow-2xl overflow-hidden scroll-bg">
        <div className="absolute top-2 right-2">
          <button onClick={onClose} className="p-2 text-[#5D4037] hover:bg-[#5D4037]/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-calligraphy text-[#3E2723] flex items-center justify-center gap-2">
            <Settings className="w-6 h-6" /> 兵法配置
          </h2>
          <div className="h-1 w-24 bg-[#FFB300] mx-auto mt-2"></div>
        </div>

        <div className="bg-white/50 border-2 border-[#D7CCC8] rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#5D4037] flex items-center gap-1">
                    <BarChart className="w-3 h-3" /> 兵书完整度
                </span>
                <span className="text-xs text-[#795548]">{stats.totalQuestions} 道题目 / {stats.unlockedStages} 关卡</span>
            </div>
            <div className="w-full bg-[#EFEBE9] h-2 rounded-full overflow-hidden border border-[#D7CCC8]">
                <div 
                    className="bg-[#66BB6A] h-full transition-all duration-1000" 
                    style={{ width: `${progressPercent}%` }}
                ></div>
            </div>
            <p className="text-[10px] text-[#8D6E63] mt-2 italic text-center">
                温馨提示：使用 AI 模式游玩会自动将题目收录进本地兵书。
            </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => onUpdateSource('ai')}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
              currentSource === 'ai' 
                ? 'bg-[#FFECB3] border-[#FFB300] ring-2 ring-[#FFB300]/30' 
                : 'bg-white border-[#D7CCC8] hover:border-[#A1887F]'
            }`}
          >
            <div className={`p-3 rounded-full ${currentSource === 'ai' ? 'bg-[#FFB300] text-[#3E2723]' : 'bg-[#EFEBE9] text-[#795548]'}`}>
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-[#3E2723]">实时星占 (AI)</div>
              <div className="text-xs text-[#795548] mt-1">天机流转，题目自动存入本地兵书。</div>
            </div>
          </button>

          <button
            onClick={() => onUpdateSource('local')}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
              currentSource === 'local' 
                ? 'bg-[#E8F5E9] border-[#66BB6A] ring-2 ring-[#66BB6A]/30' 
                : 'bg-white border-[#D7CCC8] hover:border-[#A1887F]'
            }`}
          >
            <div className={`p-3 rounded-full ${currentSource === 'local' ? 'bg-[#66BB6A] text-white' : 'bg-[#EFEBE9] text-[#795548]'}`}>
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-[#3E2723]">兵书检索 (本地)</div>
              <div className="text-xs text-[#795548] mt-1">从已收录题目中抽选，支持离线挑战。</div>
            </div>
          </button>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={onClose}
            className="px-8 py-2 bg-[#5D4037] text-white rounded-full font-bold hover:bg-[#3E2723] transition-colors shadow-md"
          >
            确认配置
          </button>
        </div>
      </div>
    </div>
  );
};

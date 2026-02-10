import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FortuneService } from '../services/fortune.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen py-8 flex items-center justify-center p-4 animate-fade-in-slow">
      @if (fortune(); as f) {
        <div class="w-full max-w-2xl glass-panel rounded-2xl border-2 border-yellow-500/50 relative overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            <!-- Header Badge - Fixed at top -->
            <div class="bg-gradient-to-r from-red-800 to-red-900 p-4 md:p-6 text-center border-b border-yellow-500/30 relative flex-shrink-0">
                <div class="absolute top-2 left-2 text-yellow-500/20 text-3xl md:text-4xl">🌸</div>
                <div class="absolute top-2 right-2 text-yellow-500/20 text-3xl md:text-4xl">🌸</div>
                
                <h3 class="text-yellow-200 uppercase tracking-widest text-xs md:text-sm mb-1">Kết Quả Gieo Quẻ</h3>
                <h1 class="text-3xl md:text-5xl font-bold text-yellow-400 mb-2">Quẻ Số {{f.id}}</h1>
                <span class="inline-block px-3 py-0.5 md:px-4 md:py-1 rounded-full border border-yellow-400 text-yellow-300 bg-red-950/50 text-sm md:text-base font-bold shadow-sm">
                    {{f.level}}
                </span>
            </div>

            <!-- Scrollable Content Area -->
            <div class="flex-grow overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar">
                
                <!-- Poem -->
                <div class="text-center space-y-2 py-4 border-t border-b border-yellow-500/20 relative shrink-0">
                     <div class="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                        <span class="text-6xl md:text-8xl">🧧</span>
                     </div>
                     @for (line of f.poem; track $index) {
                         <p class="text-lg md:text-2xl font-serif text-yellow-100 leading-relaxed drop-shadow-sm">{{line}}</p>
                     }
                </div>

                <!-- Interpretation -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div class="bg-red-900/40 p-4 rounded-xl border border-red-800 shadow-inner">
                        <h4 class="text-yellow-400 font-bold mb-2 flex items-center gap-2 text-lg">
                            <span>📖</span> Giải Nghĩa
                        </h4>
                        <p class="text-gray-100 text-sm md:text-base leading-relaxed text-justify">{{f.interpretation}}</p>
                    </div>

                    <div class="bg-red-900/40 p-4 rounded-xl border border-red-800 shadow-inner">
                        <h4 class="text-yellow-400 font-bold mb-2 flex items-center gap-2 text-lg">
                            <span>💡</span> Lời Khuyên
                        </h4>
                        <p class="text-gray-100 text-sm md:text-base leading-relaxed text-justify">{{f.advice}}</p>
                    </div>
                </div>

                <!-- Lucky Items -->
                <div class="flex justify-around items-center bg-black/20 p-4 rounded-xl border border-white/5">
                    <div class="text-center">
                        <span class="block text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">Màu May Mắn</span>
                        <div class="flex items-center gap-2 justify-center mt-2">
                            <div class="w-8 h-8 rounded-full border-2 border-white/20 shadow-lg ring-2 ring-white/5" [style.background-color]="f.luckyColor"></div>
                        </div>
                    </div>
                    <div class="w-px h-10 bg-white/10"></div>
                    <div class="text-center">
                        <span class="block text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">Số May Mắn</span>
                        <span class="text-3xl md:text-4xl font-bold text-yellow-400 mt-1 block">{{f.luckyNumber}}</span>
                    </div>
                </div>
            </div>

            <!-- Footer Buttons - Fixed at bottom -->
            <div class="p-4 md:p-6 bg-red-950/30 border-t border-yellow-500/10 flex-shrink-0">
                <div class="flex flex-col md:flex-row gap-3">
                    <button (click)="reset()" class="flex-1 py-3 border-2 border-yellow-500 text-yellow-400 rounded-lg hover:bg-yellow-500 hover:text-red-900 font-bold transition-colors text-sm md:text-base uppercase tracking-wide">
                        Gieo Quẻ Khác
                    </button>
                    <button (click)="home()" class="flex-1 py-3 bg-red-800 text-red-100 rounded-lg hover:bg-red-700 font-bold transition-colors text-sm md:text-base uppercase tracking-wide shadow-lg">
                        Về Trang Chủ
                    </button>
                </div>
            </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .animate-fade-in-slow {
      animation: fadeInSlow 0.8s ease-out;
    }
    @keyframes fadeInSlow {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(0,0,0,0.1); 
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(218, 165, 32, 0.5); 
      border-radius: 4px;
    }
  `]
})
export class ResultComponent {
  fortuneService = inject(FortuneService);
  fortune = this.fortuneService.currentFortune;

  reset() {
    this.fortuneService.reset();
  }

  home() {
    this.fortuneService.goHome();
  }
}
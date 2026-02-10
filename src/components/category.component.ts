import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FortuneService, Category } from '../services/fortune.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen p-4 py-8 animate-slide-up relative z-10">
      
      <!-- Header Section -->
      <div class="text-center mb-8 md:mb-12 w-full animate-fade-in-down">
        <h2 class="text-3xl md:text-4xl font-bold text-yellow-400 drop-shadow-lg mb-2" style="text-shadow: 0 2px 4px rgba(0,0,0,0.5);">
          Xin chào {{ fortuneService.userName() }},
        </h2>
        <div class="h-0.5 w-24 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-4"></div>
        <p class="text-lg md:text-xl font-medium text-yellow-100/90 italic">Bạn muốn xin quẻ về điều gì?</p>
      </div>

      <!-- Grid Layout: 2x2 Cards -->
      <div class="grid grid-cols-2 gap-4 md:gap-8 w-full max-w-lg md:max-w-4xl px-2">
        
        <!-- Love Card -->
        <button (click)="select('love')" 
          class="group relative overflow-hidden rounded-2xl aspect-square md:aspect-[4/3] bg-gradient-to-br from-[#5a0a0a] to-[#3d0505] border border-red-800/50 hover:border-pink-400/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] active:scale-95 flex flex-col items-center justify-center">
          
          <!-- Hover Background Glow -->
          <div class="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <!-- Icon Container -->
          <div class="relative z-10 mb-3 md:mb-5 p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors backdrop-blur-sm ring-1 ring-white/10 group-hover:ring-pink-400/30">
            <span class="text-5xl md:text-7xl block filter drop-shadow-lg transform transition-transform duration-500 group-hover:animate-heartbeat">
              💕
            </span>
          </div>
          
          <!-- Text -->
          <span class="relative z-10 text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-pink-100 group-hover:text-white transition-colors">
            Tình Duyên
          </span>
        </button>

        <!-- Career Card -->
        <button (click)="select('career')" 
          class="group relative overflow-hidden rounded-2xl aspect-square md:aspect-[4/3] bg-gradient-to-br from-[#5a0a0a] to-[#3d0505] border border-red-800/50 hover:border-blue-400/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(96,165,250,0.3)] active:scale-95 flex flex-col items-center justify-center">
          
          <div class="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative z-10 mb-3 md:mb-5 p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors backdrop-blur-sm ring-1 ring-white/10 group-hover:ring-blue-400/30">
            <span class="text-5xl md:text-7xl block filter drop-shadow-lg transform transition-transform duration-500 group-hover:animate-wiggle">
              💼
            </span>
          </div>
          
          <span class="relative z-10 text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-100 group-hover:text-white transition-colors">
            Công Việc
          </span>
        </button>

        <!-- Family Card -->
        <button (click)="select('family')" 
          class="group relative overflow-hidden rounded-2xl aspect-square md:aspect-[4/3] bg-gradient-to-br from-[#5a0a0a] to-[#3d0505] border border-red-800/50 hover:border-orange-400/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(251,146,60,0.3)] active:scale-95 flex flex-col items-center justify-center">
          
          <div class="absolute inset-0 bg-gradient-to-t from-orange-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative z-10 mb-3 md:mb-5 p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors backdrop-blur-sm ring-1 ring-white/10 group-hover:ring-orange-400/30">
            <span class="text-5xl md:text-7xl block filter drop-shadow-lg transform transition-transform duration-500 group-hover:animate-float">
              🏠
            </span>
          </div>
          
          <span class="relative z-10 text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-orange-100 group-hover:text-white transition-colors">
            Gia Đình
          </span>
        </button>

        <!-- Health Card -->
        <button (click)="select('health')" 
          class="group relative overflow-hidden rounded-2xl aspect-square md:aspect-[4/3] bg-gradient-to-br from-[#5a0a0a] to-[#3d0505] border border-red-800/50 hover:border-green-400/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] active:scale-95 flex flex-col items-center justify-center">
          
          <div class="absolute inset-0 bg-gradient-to-t from-green-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative z-10 mb-3 md:mb-5 p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors backdrop-blur-sm ring-1 ring-white/10 group-hover:ring-green-400/30">
            <span class="text-5xl md:text-7xl block filter drop-shadow-lg transform transition-transform duration-500 group-hover:animate-spin-slow">
              🍀
            </span>
          </div>
          
          <span class="relative z-10 text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-green-100 group-hover:text-white transition-colors">
            Sức Khỏe
          </span>
        </button>
      </div>
      
      <button (click)="back()" class="mt-10 py-2 px-6 text-yellow-500/80 hover:text-yellow-400 hover:underline text-sm md:text-base transition-colors font-medium tracking-wide">
        Quay lại
      </button>
    </div>
  `,
  styles: [`
    .animate-slide-up {
      animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .animate-fade-in-down {
      animation: fadeInDown 0.8s ease-out;
    }
    
    /* Specific Icon Animations */
    .group-hover\\:animate-heartbeat {
        animation: heartbeat 1.2s infinite;
    }
    .group-hover\\:animate-wiggle {
        animation: wiggle 0.6s ease-in-out infinite;
    }
    .group-hover\\:animate-float {
        animation: floatIcon 2s ease-in-out infinite;
    }
    .group-hover\\:animate-spin-slow {
        animation: spinIcon 3s linear infinite;
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(60px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    /* Icon Keyframes */
    @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
    }
    @keyframes wiggle {
        0%, 100% { transform: rotate(-6deg); }
        50% { transform: rotate(6deg); }
    }
    @keyframes floatIcon {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
    }
    @keyframes spinIcon {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
  `]
})
export class CategoryComponent {
  fortuneService = inject(FortuneService);

  select(cat: Category) {
    this.fortuneService.selectCategory(cat);
  }

  back() {
    this.fortuneService.goHome();
  }
}
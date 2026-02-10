import { Component, inject, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FortuneService } from '../services/fortune.service';

@Component({
  selector: 'app-drawing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center justify-between min-h-screen w-full overflow-hidden relative py-8 pb-24">
      
      <!-- Header with Horse Mascot Context -->
      <div class="w-full text-center z-10 transition-opacity duration-500 px-4 mt-2 flex flex-col items-center" [class.opacity-0]="isShaking() || hasFallen()">
        <h2 class="text-3xl md:text-4xl font-bold text-yellow-400 mb-1 drop-shadow-md font-serif tracking-wide">Thành Tâm Xin Quẻ</h2>
        <div class="flex items-center gap-2 justify-center">
            <span class="text-yellow-100 text-sm md:text-lg opacity-90 font-medium">Năm Bính Ngọ 2026</span>
        </div>
      </div>

      <!-- 3D Scene Wrapper -->
      <div class="flex-grow flex items-center justify-center w-full relative">
        
        <!-- Chibi Horse Mascot -->
        <div class="absolute z-20 pointer-events-none animate-bounce-slow" 
             style="right: 50%; transform: translateX(150px) translateY(50px); margin-right: -150px;"> 
             <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Horse%20Face.png" 
                  alt="Chibi Horse" 
                  class="w-24 h-24 md:w-32 md:h-32 drop-shadow-2xl filter brightness-110" />
        </div>

        <div class="scene">
          <div class="container-3d" [class.shaking]="isShaking()">
            
            <!-- Living Sticks Inside -->
            <div class="stick-group">
              @for (stick of sticks; track $index) {
                <div class="stick-wrapper" [style.transform]="'rotateZ(' + stick.angle + 'deg)'">
                  <div class="stick-body animate-breathe" 
                       [style.animation-delay]="'-' + stick.delay + 's'"
                       [style.transform]="'rotateX(' + stick.tilt + 'deg)'">
                    <div class="stick-tip"></div>
                  </div>
                </div>
              }
            </div>

            <!-- Hexagonal Cup with "Red Envelope" Style Faces -->
            
            <!-- Face 1: Đức -->
            <div class="cup-face">
                <div class="cup-face-pattern"></div>
                <div class="cup-decoration">⚜️</div>
                <div class="cup-label">Đức</div>
                <div class="cup-decoration mt-2">⚜️</div>
            </div> 
            
            <!-- Face 2: Lộc -->
            <div class="cup-face">
                <div class="cup-face-pattern"></div>
                <div class="cup-decoration">⚜️</div>
                <div class="cup-label">Lộc</div>
                <div class="cup-decoration mt-2">⚜️</div>
            </div> 
            
            <!-- Face 3: Phúc -->
            <div class="cup-face">
                <div class="cup-face-pattern"></div>
                <div class="cup-decoration">⚜️</div>
                <div class="cup-label">Phúc</div>
                <div class="cup-decoration mt-2">⚜️</div>
            </div> 
            
            <!-- Face 4: Thọ -->
            <div class="cup-face">
                <div class="cup-face-pattern"></div>
                <div class="cup-decoration">⚜️</div>
                <div class="cup-label">Thọ</div>
                <div class="cup-decoration mt-2">⚜️</div>
            </div> 
            
            <!-- Face 5: An -->
            <div class="cup-face">
                <div class="cup-face-pattern"></div>
                <div class="cup-decoration">⚜️</div>
                <div class="cup-label">An</div>
                <div class="cup-decoration mt-2">⚜️</div>
            </div> 
            
            <!-- Face 6: Tài -->
            <div class="cup-face">
                <div class="cup-face-pattern"></div>
                <div class="cup-decoration">⚜️</div>
                <div class="cup-label">Tài</div>
                <div class="cup-decoration mt-2">⚜️</div>
            </div> 
            
            <div class="cup-bottom"></div>
            
          </div>
        </div>
      </div>

      <!-- Falling Stick Animation -->
      @if (hasFallen()) {
        <div class="falling-stick">
            <div class="absolute top-0 w-full h-12 bg-gradient-to-b from-red-600 to-red-800 rounded-t-lg border-b border-black/10"></div>
            <div class="absolute bottom-12 text-xs font-bold text-red-900 rotate-90 transform origin-center whitespace-nowrap scale-125">
                Quẻ {{fortuneId}}
            </div>
        </div>
      }

      <!-- Controls: Cuter Button with Hand Icon -->
      <div class="z-20 w-full flex justify-center mb-8">
        @if (!isShaking() && !hasFallen()) {
          <button (click)="startShake()" 
            class="group relative px-8 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold text-xl rounded-full shadow-lg shadow-pink-500/40 hover:scale-105 transition-transform active:scale-95 border-4 border-white/20 flex items-center justify-center gap-3 overflow-hidden font-quicksand">
            
            <!-- Animated Hand Icon -->
            <span class="text-3xl animate-hand-shake filter drop-shadow-sm">👋</span> 
            <span class="drop-shadow-sm tracking-wide">Lắc Quẻ</span>
            
            <!-- Button Shine -->
            <div class="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-[-150%] transition-transform duration-700"></div>
          </button>
        }
        @if (isShaking()) {
          <div class="px-6 py-2 bg-black/40 rounded-full border border-pink-400/50 backdrop-blur-md shadow-xl animate-pulse">
             <div class="text-pink-200 text-lg font-bold flex items-center gap-2 font-quicksand">
               <span class="animate-spin text-xl">✨</span> Đang cầu nguyện...
             </div>
          </div>
        }
      </div>

    </div>
  `,
  styles: [`
    .font-quicksand {
        font-family: 'Quicksand', sans-serif;
    }
    .animate-bounce-slow {
        animation: bounce 3s infinite;
    }
    .animate-wiggle {
        animation: wiggle 2s ease-in-out infinite;
    }
    @keyframes shine {
        0% { transform: translateX(-150%) skewX(-12deg); }
        100% { transform: translateX(150%) skewX(-12deg); }
    }
    .group-hover\\:animate-shine {
        animation: shine 1s ease-in-out infinite;
    }
    @keyframes wiggle {
        0%, 100% { transform: rotate(12deg); }
        50% { transform: rotate(-5deg); }
    }
    /* Hand Shake Animation */
    .animate-hand-shake {
        animation: handShake 2.5s infinite ease-in-out;
        transform-origin: 70% 70%;
        display: inline-block;
    }
    @keyframes handShake {
        0%, 100% { transform: rotate(0deg); }
        10% { transform: rotate(14deg); }
        20% { transform: rotate(-8deg); }
        30% { transform: rotate(14deg); }
        40% { transform: rotate(-4deg); }
        50% { transform: rotate(10deg); }
        60% { transform: rotate(0deg); }
    }
  `]
})
export class DrawingComponent implements OnDestroy {
  fortuneService = inject(FortuneService);
  isShaking = signal(false);
  hasFallen = signal(false);
  
  sticks = Array.from({ length: 30 }, (_, i) => ({
    angle: i * (360 / 30),
    tilt: 9 + Math.random() * 6,
    delay: Math.random() * 2.5,
  }));

  shakeTimeout: any;
  resultTimeout: any;
  fortuneId = 1;

  constructor() {
    if (typeof window !== 'undefined' && 'ondevicemotion' in window) {
      window.addEventListener('devicemotion', this.handleMotion, false);
    }
  }

  handleMotion = (event: DeviceMotionEvent) => {
    if (this.isShaking() || this.hasFallen()) return;

    const acc = event.accelerationIncludingGravity;
    if (!acc) return;

    const limit = 20;
    if ((acc.x && Math.abs(acc.x) > limit) || 
        (acc.y && Math.abs(acc.y) > limit)) {
      this.startShake();
    }
  }

  startShake() {
    if (this.isShaking()) return;
    
    this.isShaking.set(true);
    
    this.fortuneService.drawFortune();
    this.fortuneId = this.fortuneService.currentFortune()?.id || 8;

    this.shakeTimeout = setTimeout(() => {
      this.isShaking.set(false);
      this.triggerFall();
    }, 2000); 
  }

  triggerFall() {
    this.hasFallen.set(true);
    
    this.resultTimeout = setTimeout(() => {
        this.fortuneService.showResult();
    }, 1500);
  }

  ngOnDestroy() {
    clearTimeout(this.shakeTimeout);
    clearTimeout(this.resultTimeout);
    if (typeof window !== 'undefined') {
      window.removeEventListener('devicemotion', this.handleMotion);
    }
  }
}
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FortuneService } from '../services/fortune.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen text-center p-6 animate-fade-in relative overflow-hidden">
      
      <!-- Decorative background elements for centering visual weight -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 z-0">
          <div class="w-[300px] h-[300px] bg-red-800 rounded-full blur-3xl"></div>
      </div>

      <div class="relative z-10 mb-8 md:mb-12">
        <div class="absolute -top-8 -left-8 md:-top-10 md:-left-10 text-5xl md:text-6xl opacity-50 animate-pulse">🌸</div>
        <h1 class="text-4xl md:text-6xl font-bold text-yellow-400 drop-shadow-lg mb-2 tracking-wide">
          Gieo Quẻ<br/><span class="text-5xl md:text-7xl">Tân Xuân</span>
        </h1>
        <div class="h-1 w-32 bg-yellow-500 mx-auto rounded-full mt-2"></div>
        <p class="text-lg md:text-xl text-yellow-100 mt-4 italic">Khám phá vận mệnh - Đón lộc đầu năm</p>
        <div class="absolute -bottom-8 -right-8 md:-bottom-10 md:-right-10 text-5xl md:text-6xl opacity-50 animate-pulse delay-700">🌸</div>
      </div>

      <div class="w-full max-w-sm md:max-w-md glass-panel p-6 md:p-8 rounded-2xl transform transition-all duration-500 hover:scale-105 shadow-2xl z-10">
        <div class="mb-6">
          <label class="block text-yellow-300 text-lg mb-2 font-bold">Quý danh của bạn:</label>
          <input
            type="text"
            [(ngModel)]="inputName"
            (keyup.enter)="start()"
            (focus)="onFocus()"
            (input)="onInput($event)"
            (blur)="touched.set(true)"
            placeholder="Nhập tên của bạn..."
            class="w-full px-4 py-3 rounded-lg bg-red-950 border-2 text-yellow-100 placeholder-red-300 focus:outline-none focus:ring-2 transition-all text-center text-xl"
            [class]="!inputName().trim() && touched() ? 'border-red-400 focus:border-red-400 focus:ring-red-500/50' : 'border-yellow-600 focus:border-yellow-400 focus:ring-yellow-500/50'"
          >
          @if (!inputName().trim() && touched()) {
            <p class="text-red-400 text-sm mt-2">⚠ Vui lòng nhập tên của bạn</p>
          }
        </div>

        <button 
          (click)="start()"
          [disabled]="!inputName()"
          class="w-full py-4 px-6 bg-gradient-to-r from-yellow-600 to-yellow-400 text-red-900 font-bold text-xl rounded-full shadow-lg transform active:scale-95 transition-all hover:shadow-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider">
          Bắt Đầu
        </button>
      </div>
      
      <div class="h-10"></div> <!-- Spacer for mobile browsers with bottom bars -->
    </div>
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 1s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class WelcomeComponent {
  fortuneService = inject(FortuneService);
  inputName = signal('');
  touched = signal(false);
  private musicStarted = false;

  constructor() {
    this.inputName.set(this.fortuneService.userName());
  }

  onFocus() {
    if (!this.musicStarted) {
      this.musicStarted = true;
      this.fortuneService.playBackgroundMusic();
    }
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (!this.musicStarted && value.trim()) {
      this.musicStarted = true;
      this.fortuneService.playBackgroundMusic();
    }
  }

  start() {
    this.touched.set(true);
    if (this.inputName().trim()) {
      if (!this.musicStarted) {
        this.musicStarted = true;
        this.fortuneService.playBackgroundMusic();
      }
      this.fortuneService.setUserName(this.inputName().trim());
    }
  }
}
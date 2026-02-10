import { Injectable, signal, computed } from '@angular/core';
import { Fortune, FORTUNES } from './data';

export type AppScreen = 'welcome' | 'category' | 'drawing' | 'result';
export type Category = 'love' | 'career' | 'family' | 'health';

@Injectable({
  providedIn: 'root'
})
export class FortuneService {
  // State Signals
  currentScreen = signal<AppScreen>('welcome');
  userName = signal<string>('');
  selectedCategory = signal<Category | null>(null);
  currentFortune = signal<Fortune | null>(null);

  // Background music
  private bgAudio: HTMLAudioElement | null = null;
  private audioFiles = [
    'assets/cutcut.mp3',
    'assets/cutmtp.mp3',
    'assets/linhcut.mp3',
    'assets/trucnhan.mp3',
  ];

  constructor() {
    // Load saved name
    const savedName = localStorage.getItem('fortune_userName');
    if (savedName) {
      this.userName.set(savedName);
    }
  }

  playBackgroundMusic() {
    // Stop any existing music first
    this.stopBackgroundMusic();

    const randomIndex = Math.floor(Math.random() * this.audioFiles.length);
    const src = this.audioFiles[randomIndex];
    this.bgAudio = new Audio(src);
    this.bgAudio.loop = true;
    this.bgAudio.volume = 0.5;
    this.bgAudio.addEventListener('error', () => {
      console.error('Failed to load audio:', src);
    });
    this.bgAudio.play().catch((err) => {
      console.warn('Background music autoplay blocked:', err.message);
    });
  }

  stopBackgroundMusic() {
    if (this.bgAudio) {
      this.bgAudio.pause();
      this.bgAudio.currentTime = 0;
      this.bgAudio = null;
    }
  }

  setUserName(name: string) {
    this.userName.set(name);
    localStorage.setItem('fortune_userName', name);
    this.currentScreen.set('category');
  }

  selectCategory(category: Category) {
    this.selectedCategory.set(category);
    this.currentScreen.set('drawing');
  }

  drawFortune() {
    const category = this.selectedCategory();
    if (!category) return;

    const list = FORTUNES[category];
    const randomIndex = Math.floor(Math.random() * list.length);
    const fortune = list[randomIndex];
    
    // Simulate randomness if list is small, pick randomly from list
    // In a real app with more data, this logic holds. 
    // If category undefined in data, fallback (should not happen with types)
    const finalFortune = fortune || FORTUNES['love'][0];

    this.currentFortune.set(finalFortune);
  }

  showResult() {
    this.currentScreen.set('result');
  }

  reset() {
    this.currentScreen.set('category');
    this.currentFortune.set(null);
    this.selectedCategory.set(null);
  }
  
  goHome() {
    this.stopBackgroundMusic();
    this.currentScreen.set('welcome');
    this.currentFortune.set(null);
    this.selectedCategory.set(null);
  }
}
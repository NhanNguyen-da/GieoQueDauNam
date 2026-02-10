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

  constructor() {
    // Load saved name
    const savedName = localStorage.getItem('fortune_userName');
    if (savedName) {
      this.userName.set(savedName);
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
    this.currentScreen.set('welcome');
    this.currentFortune.set(null);
    this.selectedCategory.set(null);
  }
}
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FortuneService } from './services/fortune.service';
import { WelcomeComponent } from './components/welcome.component';
import { CategoryComponent } from './components/category.component';
import { DrawingComponent } from './components/drawing.component';
import { ResultComponent } from './components/result.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, WelcomeComponent, CategoryComponent, DrawingComponent, ResultComponent],
  template: `
    <main class="min-h-screen w-full relative z-10">
      @switch (fortuneService.currentScreen()) {
        @case('welcome') {
          <app-welcome />
        }
        @case('category') {
          <app-category />
        }
        @case('drawing') {
          <app-drawing />
        }
        @case('result') {
          <app-result />
        }
      }
    </main>
    
    <footer class="fixed bottom-2 w-full text-center text-xs text-white/30 z-0 pointer-events-none">
      NhanNT &copy; {{year}}
    </footer>
  `
})
export class AppComponent {
  fortuneService = inject(FortuneService);
  year = new Date().getFullYear();
}
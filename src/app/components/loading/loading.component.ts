import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="loading-container">
      <ng-content></ng-content>
      @if (loading) {
      <div class="overlay">
        <mat-spinner></mat-spinner>
      </div>
      }
    </div>
  `,
  styles: [`
    .loading-container {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.5); /* Transparência */
      z-index: 10;
    }
  `]
})
export class LoadingComponent {
  @Input() loading: boolean = false;
}

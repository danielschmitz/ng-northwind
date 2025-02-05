import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="loading-container">
      <ng-content></ng-content>
      @if (loading) {
      <div class="loading-overlay">
        <mat-spinner></mat-spinner>
      </div>
      }
    </div>
  `
})
export class LoadingComponent {
  @Input() loading: boolean = false;
}

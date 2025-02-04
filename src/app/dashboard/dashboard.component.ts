import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [JsonPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  protected auth = inject(AuthService);
}

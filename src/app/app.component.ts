import { Component, HostBinding, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { CoreModule } from './core.module';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [CoreModule],
})
export class AppComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  protected auth = inject(AuthService);
  router = inject(Router);

  @HostBinding('class')
  currentTheme: 'light-theme' | 'dark-theme' = 'light-theme';
  isDarkMode: boolean = false;

  ngOnInit(): void {
    this.currentTheme =
      localStorage.getItem('theme') == 'dark-theme'
        ? 'dark-theme'
        : 'light-theme';
    this.isDarkMode = this.currentTheme == 'dark-theme';
  }

  onThemeChanged() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.currentTheme = 'dark-theme';
    } else {
      this.currentTheme = 'light-theme';
    }
    localStorage.setItem('theme', this.currentTheme);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  
  logout() {
    this.auth.signOut().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);        
      }
    });
  }
}

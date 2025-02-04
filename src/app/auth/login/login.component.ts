import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { CoreModule } from '../../core.module';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CoreModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  auth = inject(AuthService);
  snak = inject(MatSnackBar);
  router = inject(Router);
  loading = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        createAccount: [false],
        displayName: [''],
      },
      { validators: this.nameRequiredIfCreatingAccount }
    );
  }

  ngOnInit() {
    this.loginForm.setValue({
      email: 'john.doe@example.com',
      password: 'password',
      createAccount: false,
      displayName: 'John Doe',
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const createAccount = this.loginForm.get('createAccount')?.value;
      if (createAccount) {
        this.loading = true;
        this.auth
          .signUp(
            this.loginForm.get('email')?.value,
            this.loginForm.get('password')?.value,
            this.loginForm.get('displayName')?.value
          )
          .subscribe({
            next: () => {
              this.loginForm.reset();
              this.snak.open('Account created successfully');
              this.router.navigate(['/']);
            },
            error: (error) => {
              // Handle error if needed
              this.loading = false;
              this.snak.open(error.message, 'ok');
            },
            complete: () => {
              this.loading = false;
            },
          });
      } else {
        this.loading = true;
        this.auth
          .signIn(
            this.loginForm.get('email')?.value,
            this.loginForm.get('password')?.value
          )
          .subscribe({
            next: () => {
              this.loginForm.reset();
              this.snak.open('Login successful');
              this.router.navigate(['/']);
            },
            error: (error) => {
              // Handle error if needed
              this.loading = false;
              this.snak.open(error.message);
            },
            complete: () => {
              this.loading = false;
            },
          });
      }
    }
  }

  private nameRequiredIfCreatingAccount(control: AbstractControl) {
    const createAccount = control.get('createAccount')?.value;
    const nameControl = control.get('displayName');

    if (createAccount && !nameControl?.value) {
      nameControl?.setErrors({ required: true });
      return { nameRequired: true };
    }

    // Limpa erros anteriores se a condição não for mais válida
    nameControl?.setErrors(null);
    return null;
  }
}

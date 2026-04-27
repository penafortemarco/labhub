import { Component, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-login',
  imports: [FormsModule, FloatLabel, InputText, ButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  username = '';
  password = '';
  errorMessage = signal('');
  loading = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login() {
    if(this.loading()) return;
    this.loading.set(true);
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.loading.set(false);
        localStorage.setItem('jwt', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage.set('Invalid username or password');
        this.loading.set(false);
      },
    });
  }
}

import { Component, inject, signal } from '@angular/core';
import { loginModel } from './data/login.type';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Field, form, required } from '@angular/forms/signals';

@Component({
  selector: 'app-login',
  imports: [Field],
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  loginModel = loginModel;
  router = inject(Router);
  authService = inject(AuthService);
  loginAlertMessage = signal<string | null>(null);

  loginForm = form(this.loginModel, (validate) => {
    required(validate.usernameOrEmail, { message: 'Username or email is required' }),
      required(validate.password, { message: 'Password is required' });
  });

  onLogin(event: Event) {
    event.preventDefault();
    const loginData = this.loginModel();

    const loginSuccess = this.authService.login(loginData);

    this.loginAlertMessage.set(null);

    if (loginSuccess) {
      // verifico le credenziali
      const user = this.authService.currentUser();
      const message = `Welcome back, ${user?.username || loginData.usernameOrEmail}.`;
      console.log('Login data:', loginData.usernameOrEmail, loginData.password);
      this.loginAlertMessage.set(message);
      setTimeout(() => {
        this.router.navigate(['profile']);
      }, 2000);
    } else {
      const errorMessage = 'Login failed. Please check your credentials and try again.';
      this.loginAlertMessage.set(errorMessage);
      console.error('Login failed for user:', loginData.usernameOrEmail);
      setTimeout(() => {
        this.router.navigate(['login']);
        this.loginAlertMessage.set(null);
      }, 2000);
    }
  }
}

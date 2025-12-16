import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { form, Field, required, email, validate, minLength } from '@angular/forms/signals';
import { registerModel } from './data/register.type';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [Field],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  registerModel = registerModel;
  router = inject(Router);
  authService = inject(AuthService);
  // messaggio alert personalizzato
  registerAlertMessage = signal<string | null>(null);

  // form con i signal e le validazioni
  registerForm = form(this.registerModel, (validate) => {
    // campi obbligatori
    required(validate.username, { message: 'Username is required' }),
      required(validate.email, { message: 'Email is required' }),
      required(validate.password, { message: 'Password is required' }),
      // email valida
      email(validate.email),
      // password min 6 caratteri
      minLength(validate.password, 6, { message: 'Password must be at least 6 characters long' });
  });

  // onSubmit
  onSubmit(event: Event) {
    event.preventDefault();
    const newUser = this.registerModel();
    this.registerAlertMessage.set(null);
    if (newUser) {
      this.authService.registerUser(newUser);
      const message = `Registration successful! Welcome, ${newUser.username}. You can now log in.`;
      this.registerAlertMessage.set(message);
      console.log('Register data:', newUser.email, newUser.username, newUser.password);
      setTimeout(() => {
        this.router.navigate(['login']);
      }, 2000);
    } else {
      console.error('Form is invalid');
      this.registerAlertMessage.set('Registration failed. Please check the form for errors.');
    }
  }
}

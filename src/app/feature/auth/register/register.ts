import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { form, Field, required, email, validate, minLength } from '@angular/forms/signals';
import { registerModel } from './data/register.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [Field],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  registerModel = registerModel;
  router = inject(Router);

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
    const data = this.registerModel(); 
    if (data) {
      console.log('Register data:', data.email, data.username, data.password);
      this.router.navigate(['login']);
    }
  }
}

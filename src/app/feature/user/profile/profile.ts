import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  // prendo i dati dell'utente loggato 
  authService = inject(AuthService);
  router = inject(Router);
  setMessage = signal<string | null>(null);

  onLogout(event: Event) {
    event.preventDefault();
    const message = 'Loggin out... See you soon!';
    this.setMessage.set(message);
    this.authService.logout();
    setTimeout(() => {
      this.router.navigate(['register']);
      this.setMessage.set(null);
    }, 1000);
  }
}

import { Injectable, signal } from '@angular/core';
import { registerData } from './register/data/register.type';
import { USERS_KEY } from './auth.type';
import { loginData } from './login/data/login.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = signal<registerData | null>(null);

  // salvo i dati dell'utente

  registerUser(user: registerData): void {
    const usersJson = localStorage.getItem(USERS_KEY);
    const users: registerData[] = usersJson ? JSON.parse(usersJson) : [];

    users.push(user);

    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    console.log('User registered:', user.username, 'salvato in localStorage.');
  }

  // recupero i dati 
  getRegisteredUsers(): registerData[] {
    const usersJson = localStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  login(credenziali: loginData): boolean {
    const loginUser = this.getRegisteredUsers();

    const foundUser = loginUser.find( user => (
      (user.username === credenziali.usernameOrEmail || user.email === credenziali.usernameOrEmail) && // prendo username o email e poi pw
      user.password === credenziali.password
    )); 

    if (foundUser) {
      this.currentUser.set(foundUser);
      console.log('Login successful for user:', foundUser.username);
      return true;
    }
    this.currentUser.set(null);
    console.error('Login failed: Invalid credentials');
    return false;
  }


}

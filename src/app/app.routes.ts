import { Routes } from '@angular/router';
import { Register } from './feature/auth/register/register';
import { Login } from './feature/auth/login/login';
import { Profile } from './feature/user/profile/profile';

export const routes: Routes = [
    { path: '', redirectTo: '/register', pathMatch: 'full' },
    { path: 'register', component: Register },
    { path: 'login', component: Login },
    { path: 'profile', component: Profile }
];

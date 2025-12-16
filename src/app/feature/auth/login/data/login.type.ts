import { signal } from "@angular/core";

export interface loginData {
    usernameOrEmail: string;
    password: string;
}

export const loginModel = signal<loginData>({
    usernameOrEmail: '',
    password: ''
});
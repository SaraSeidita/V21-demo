import { signal } from "@angular/core";

export interface loginData {
    email: string;
    password: string;
}

export const loginModel = signal<loginData>({
    email: '',
    password: ''
});
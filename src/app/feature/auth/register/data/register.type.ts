import { signal } from "@angular/core";

export interface registerData {
    username: string;
    email: string;
    password: string;
}

export const registerModel = signal<registerData>({
    username: '',
    email: '',
    password: ''
});
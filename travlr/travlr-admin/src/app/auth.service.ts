import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest } from './models/auth-response';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiBaseUrl = 'http://localhost:3000/api';
    private tokenKey = 'travlr_token';

    constructor(private http: HttpClient) { }

    register(request: RegisterRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiBaseUrl}/register`, request).pipe(
            tap(res => this.saveToken(res.token))
        );
    }

    login(request: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiBaseUrl}/login`, request).pipe(
            tap(res => this.saveToken(res.token))
        );
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
    }

    saveToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    isLoggedIn(): boolean {
        const token = this.getToken();
        if (!token) {
            return false;
        }

        // Decode the JWT payload to check expiry client-side
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const now = Math.floor(Date.now() / 1000);
            return payload.exp > now;
        } catch {
            return false;
        }
    }
}

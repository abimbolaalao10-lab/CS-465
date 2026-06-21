import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    submitted = false;
    error: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        // If already logged in, skip straight to the admin listing
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/']);
        }

        this.loginForm = this.formBuilder.group({
            email:    ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    get f() { return this.loginForm.controls; }

    onSubmit(): void {
        this.submitted = true;
        this.error = '';

        if (this.loginForm.invalid) {
            return;
        }

        this.authService.login(this.loginForm.value).subscribe({
            next: () => {
                this.router.navigate(['/']);
            },
            error: (err) => {
                console.error(err);
                this.error = err.error?.message || 'Login failed. Check your credentials.';
            }
        });
    }
}

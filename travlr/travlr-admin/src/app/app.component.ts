import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink],
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'travlr-admin';

    constructor(public authService: AuthService, private router: Router) { }

    onLogout(): void {
        this.authService.logout();
        this.router.navigate(['/']);
    }
}

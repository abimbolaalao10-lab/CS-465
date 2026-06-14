import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';

@Component({
    selector: 'app-trip-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './trip-card.component.html',
    styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {
    @Input() trip!: Trip;
    @Output() deletedTrip = new EventEmitter<string>();

    constructor(private router: Router) { }

    editTrip(tripCode: string): void {
        localStorage.setItem('tripCode', tripCode);
        this.router.navigate(['edit-trip']);
    }

    deleteTrip(tripCode: string): void {
        if (confirm(`Delete trip "${this.trip.name}"?`)) {
            this.deletedTrip.emit(tripCode);
        }
    }
}

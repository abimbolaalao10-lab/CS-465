import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Trip } from '../models/trip';
import { TripDataService } from '../trip-data.service';
import { TripCardComponent } from '../trip-card/trip-card.component';

@Component({
    selector: 'app-trip-listing',
    standalone: true,
    imports: [CommonModule, RouterLink, TripCardComponent],
    templateUrl: './trip-listing.component.html',
    styleUrls: ['./trip-listing.component.css']
})
export class TripListingComponent implements OnInit {
    trips: Trip[] = [];
    message: string = '';
    error: string = '';

    constructor(private tripDataService: TripDataService) { }

    ngOnInit(): void {
        this.loadTrips();
    }

    loadTrips(): void {
        this.message = '';
        this.error = '';
        this.tripDataService.getTrips().subscribe({
            next: (trips) => {
                this.trips = trips;
                this.message = trips.length > 0
                    ? `Found ${trips.length} trip(s)`
                    : 'No trips found.';
            },
            error: (err) => {
                console.error(err);
                this.error = 'Failed to load trips. Is the Express server running on port 3000?';
            }
        });
    }

    onDeleteTrip(tripCode: string): void {
        this.tripDataService.deleteTrip(tripCode).subscribe({
            next: () => {
                this.trips = this.trips.filter(t => t.code !== tripCode);
                this.message = 'Trip deleted successfully.';
            },
            error: (err) => {
                console.error(err);
                this.error = 'Failed to delete trip.';
            }
        });
    }
}

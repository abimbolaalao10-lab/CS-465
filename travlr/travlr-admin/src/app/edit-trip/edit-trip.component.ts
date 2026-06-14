import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../trip-data.service';
import { Trip } from '../models/trip';

@Component({
    selector: 'app-edit-trip',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './edit-trip.component.html',
    styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
    editForm!: FormGroup;
    submitted = false;
    tripCode: string = '';
    error: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private tripDataService: TripDataService
    ) { }

    ngOnInit(): void {
        this.tripCode = localStorage.getItem('tripCode') || '';

        this.editForm = this.formBuilder.group({
            code:        ['', [Validators.required, Validators.minLength(3)]],
            name:        ['', Validators.required],
            length:      ['', Validators.required],
            start:       ['', Validators.required],
            resort:      ['', Validators.required],
            perPerson:   ['', Validators.required],
            image:       ['', Validators.required],
            description: ['', Validators.required]
        });

        if (!this.tripCode) {
            this.error = 'No trip selected. Please return to the trip list.';
            return;
        }

        this.tripDataService.getTrip(this.tripCode).subscribe({
            next: (trip: Trip) => {
                // Format the date for the date input (YYYY-MM-DD)
                const startDate = trip.start
                    ? new Date(trip.start).toISOString().substring(0, 10)
                    : '';
                this.editForm.patchValue({
                    code:        trip.code,
                    name:        trip.name,
                    length:      trip.length,
                    start:       startDate,
                    resort:      trip.resort,
                    perPerson:   trip.perPerson,
                    image:       trip.image,
                    description: trip.description
                });
            },
            error: (err) => {
                console.error(err);
                this.error = 'Failed to load trip. Is the Express server running?';
            }
        });
    }

    get f() { return this.editForm.controls; }

    onSubmit(): void {
        this.submitted = true;
        this.error = '';

        if (this.editForm.invalid) {
            return;
        }

        this.tripDataService.updateTrip(this.tripCode, this.editForm.value as Trip).subscribe({
            next: () => {
                this.router.navigate(['/']);
            },
            error: (err) => {
                console.error(err);
                this.error = err.error?.message || 'Failed to update trip.';
            }
        });
    }

    onBack(): void {
        this.router.navigate(['/']);
    }
}

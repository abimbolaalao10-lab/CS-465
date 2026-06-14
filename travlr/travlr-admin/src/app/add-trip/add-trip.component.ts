import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../trip-data.service';
import { Trip } from '../models/trip';

@Component({
    selector: 'app-add-trip',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './add-trip.component.html',
    styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {
    addForm!: FormGroup;
    submitted = false;
    error: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private tripDataService: TripDataService
    ) { }

    ngOnInit(): void {
        this.addForm = this.formBuilder.group({
            code:        ['', [Validators.required, Validators.minLength(3)]],
            name:        ['', Validators.required],
            length:      ['', Validators.required],
            start:       ['', Validators.required],
            resort:      ['', Validators.required],
            perPerson:   ['', Validators.required],
            image:       ['', Validators.required],
            description: ['', Validators.required]
        });
    }

    get f() { return this.addForm.controls; }

    onSubmit(): void {
        this.submitted = true;
        this.error = '';

        if (this.addForm.invalid) {
            return;
        }

        this.tripDataService.addTrip(this.addForm.value as Trip).subscribe({
            next: () => {
                this.router.navigate(['/']);
            },
            error: (err) => {
                console.error(err);
                this.error = err.error?.message || 'Failed to add trip. Is the Express server running?';
            }
        });
    }

    onBack(): void {
        this.router.navigate(['/']);
    }
}

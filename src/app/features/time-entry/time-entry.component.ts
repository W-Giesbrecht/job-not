import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Angular Material Importe
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TimeTrackingService } from '../../core/services/time-tracking.service';

@Component({
  selector: 'app-time-entry',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './time-entry.component.html',
  styleUrl: './time-entry.component.scss'
})
export class TimeEntryComponent {
  private fb = inject(FormBuilder);
  private timeTrackingService = inject(TimeTrackingService);

  private today = new Date().toISOString().split('T')[0];

  timeForm: FormGroup = this.fb.group({
    date: [this.today, Validators.required],
    startTime: ['06:00', Validators.required],
    endTime: ['14:30', Validators.required],
    breakMinutes: [0, [Validators.required, Validators.min(0)]],
    notes: ['']
  });

  constructor() {
    // values: any verhindert den 'unknown' Fehler
    this.timeForm.valueChanges.subscribe((values: any) => {
      if (values.startTime && values.endTime) {
        const autoBreak = this.timeTrackingService.calculateAutoBreak(
          values.startTime,
          values.endTime
        );
        this.timeForm.patchValue({ breakMinutes: autoBreak }, { emitEvent: false });
      }
    });

    const initialBreak = this.timeTrackingService.calculateAutoBreak('06:00', '14:30');
    this.timeForm.patchValue({ breakMinutes: initialBreak }, { emitEvent: false });
  }

  onSubmit(): void {
    if (this.timeForm.valid) {
      this.timeTrackingService.addRecord(this.timeForm.value);
      console.log('Eintrag gespeichert:', this.timeForm.value);
      
      this.timeForm.patchValue({
        date: this.today,
        startTime: '06:00',
        endTime: '14:30',
        notes: ''
      });
    }
  }
}
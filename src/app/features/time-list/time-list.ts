import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material Importe
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

import { TimeTrackingService } from '../../core/services/time-tracking.service';

@Component({
  selector: 'app-time-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './time-list.html',
  styleUrl: './time-list.scss'
})
export class TimeListComponent {
  private timeTrackingService = inject(TimeTrackingService);

  // Greift direkt auf das Signal im Service zu
  records = this.timeTrackingService.records;

  deleteRecord(id: string | undefined): void {
    if (id) {
      this.timeTrackingService.deleteRecord(id);
    }
  }
}
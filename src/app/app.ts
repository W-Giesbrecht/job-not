import { Component } from '@angular/core';
import { TimeEntryComponent } from './features/time-entry/time-entry.component';
import { TimeListComponent } from './features/time-list/time-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TimeEntryComponent, TimeListComponent], // <-- Hier MUSS TimeEntryComponent stehen!
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'job-note';
}

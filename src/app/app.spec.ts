import { Component } from '@angular/core';
import { TimeEntryComponent } from './features/time-entry/time-entry.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TimeEntryComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'job-note';
}
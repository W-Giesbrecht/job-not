import { Injectable, signal } from '@angular/core';
import { TimeRecord } from '../models/time-record';

@Injectable({
  providedIn: 'root',
})
export class TimeTrackingService {
  private readonly STORAGE_KEY = 'job_note_records';

  // Signals für reaktives State Management
  records = signal<TimeRecord[]>(this.loadFromStorage());

  /**
   * Berechnet die gesetzliche Pause in Minuten basierend auf der Arbeitszeit.
   * - Ab 6 Stunden: mindestens 30 Min Pause
   * - Ab 9 Stunden: mindestens 45 Min Pause
   */
  calculateAutoBreak(startTime: string, endTime: string): number {
    if (!startTime || !endTime) return 0;

    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);

    let startTotal = startH * 60 + startM;
    let endTotal = endH * 60 + endM;

    // Nachtschicht berücksichtigen (z.B. 22:00 bis 06:00 Uhr)
    if (endTotal < startTotal) {
      endTotal += 24 * 60;
    }

    const durationInHours = (endTotal - startTotal) / 60;

    if (durationInHours > 9) {
      return 45;
    } else if (durationInHours > 6) {
      return 30;
    }

    return 0;
  }

  /**
   * Fügt einen neuen Zeiteintrag hinzu und speichert ihn ab.
   */
  addRecord(record: Omit<TimeRecord, 'id' | 'createdAt'>): void {
    const newRecord: TimeRecord = {
      ...record,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    const updatedRecords = [newRecord, ...this.records()];
    this.records.set(updatedRecords);
    this.saveToStorage(updatedRecords);
  }

  /**
   * Löscht einen Eintrag anhand seiner ID.
   */
  deleteRecord(id: string): void {
    const updatedRecords = this.records().filter((r) => r.id !== id);
    this.records.set(updatedRecords);
    this.saveToStorage(updatedRecords);
  }

  // Private Hilfsmethoden für den LocalStorage
  private saveToStorage(records: TimeRecord[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(records));
  }

  private loadFromStorage(): TimeRecord[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
}

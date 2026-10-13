export interface TimeRecord {
  id?: string; // Eindeutige ID (optional, für Supabase/localStorage)
  date: string; // Datum der Schicht (z. B. '2026-10-13')
  startTime: string; // Arbeitsbeginn (z. B. '06:00')
  endTime: string; // Arbeitsende (z. B. '14:30')
  breakMinutes: number; // Automatisch berechnete oder manuelle Pause in Minuten
  notes?: string; // Notizen/Einsatzort (optional, z. B. 'A45 Baustelle')
  createdAt?: Date; // Erstellungszeitpunkt
}

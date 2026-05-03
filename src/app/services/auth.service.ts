import { Injectable, signal } from '@angular/core';
import { Resident, AbsenceRequest } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentResident = signal<Resident | null>(null);

  currentResident$ = this.currentResident.asReadonly();

  get isAuthenticated(): boolean {
    return this.currentResident() !== null;
  }

  login(residentId: string): Resident | null {
    const resident = this.mockResidents.find((r) => r.id === residentId);
    if (resident) {
      this.currentResident.set(resident);
    }
    return resident ?? null;
  }

  logout(): void {
    this.currentResident.set(null);
  }

  getResidents(): Resident[] {
    return this.mockResidents;
  }

  getResidentById(residentId: string): Resident | undefined {
    return this.mockResidents.find((resident) => resident.id === residentId);
  }

  private mockResidents: Resident[] = [
    { id: '1', firstName: 'John', lastName: 'Doe', roomNumber: '101', phoneNumber: '555-0101' },
    { id: '2', firstName: 'Jane', lastName: 'Smith', roomNumber: '102', phoneNumber: '555-0102' },
    { id: '3', firstName: 'Michael', lastName: 'Johnson', roomNumber: '103', phoneNumber: '555-0103' },
    { id: '4', firstName: 'Sarah', lastName: 'Williams', roomNumber: '104', phoneNumber: '555-0104' },
    { id: '5', firstName: 'David', lastName: 'Brown', roomNumber: '105', phoneNumber: '555-0105' },
  ];
}

import { Injectable, signal } from '@angular/core';
import { AbsenceRequest } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AbsenceService {
  private requests = signal<AbsenceRequest[]>(this.initializeMockRequests());
  requests$ = this.requests.asReadonly();

  getRequestsForResident(residentId: string): AbsenceRequest[] {
    return this.requests().filter((r) => r.residentId === residentId);
  }

  getApprovedActiveRequests(residentId: string): AbsenceRequest[] {
    return this.requests().filter(
      (r) => r.residentId === residentId && r.status === 'approved' && !r.signedIn
    );
  }

  getRequestById(id: string): AbsenceRequest | undefined {
    return this.requests().find((r) => r.id === id);
  }

  submitRequest(request: Omit<AbsenceRequest, 'id' | 'status' | 'signedOut' | 'signedIn' | 'createdAt'>): AbsenceRequest {
    const newRequest: AbsenceRequest = {
      ...request,
      id: this.generateId(),
      status: 'pending',
      signedOut: false,
      signedIn: false,
      createdAt: new Date().toISOString(),
    };
    this.requests.update((requests) => [...requests, newRequest]);
    return newRequest;
  }

  signOut(requestId: string): boolean {
    const request = this.getRequestById(requestId);
    if (!request || request.status !== 'approved' || request.signedOut) {
      return false;
    }
    this.requests.update((requests) =>
      requests.map((r) =>
        r.id === requestId
          ? { ...r, signedOut: true, signedOutAt: new Date().toISOString() }
          : r
      )
    );
    return true;
  }

  signIn(requestId: string): boolean {
    const request = this.getRequestById(requestId);
    if (!request || !request.signedOut || request.signedIn) {
      return false;
    }
    this.requests.update((requests) =>
      requests.map((r) =>
        r.id === requestId
          ? { ...r, signedIn: true, signedInAt: new Date().toISOString() }
          : r
      )
    );
    return true;
  }

  approveRequest(requestId: string): boolean {
    const request = this.getRequestById(requestId);
    if (!request || request.status !== 'pending') {
      return false;
    }
    this.requests.update((requests) =>
      requests.map((r) => (r.id === requestId ? { ...r, status: 'approved' as const } : r))
    );
    return true;
  }

  rejectRequest(requestId: string): boolean {
    const request = this.getRequestById(requestId);
    if (!request || request.status !== 'pending') {
      return false;
    }
    this.requests.update((requests) =>
      requests.map((r) => (r.id === requestId ? { ...r, status: 'rejected' as const } : r))
    );
    return true;
  }

  private generateId(): string {
    return `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeMockRequests(): AbsenceRequest[] {
    const now = new Date();
    return [
      {
        id: 'req-1',
        residentId: '1',
        reason: 'Medical appointment',
        destination: 'City Hospital',
        departureDate: new Date(now.getTime() + 86400000).toISOString(),
        returnDate: new Date(now.getTime() + 86400000 + 7200000).toISOString(),
        status: 'approved',
        signedOut: false,
        signedIn: false,
        createdAt: new Date(now.getTime() - 86400000).toISOString(),
      },
      {
        id: 'req-2',
        residentId: '1',
        reason: 'Job interview',
        destination: 'Downtown Office Park',
        departureDate: new Date(now.getTime() - 86400000).toISOString(),
        returnDate: new Date(now.getTime() - 86400000 + 7200000).toISOString(),
        status: 'approved',
        signedOut: true,
        signedOutAt: new Date(now.getTime() - 86400000).toISOString(),
        signedIn: true,
        signedInAt: new Date(now.getTime() - 86400000 + 7200000).toISOString(),
        createdAt: new Date(now.getTime() - 172800000).toISOString(),
      },
      {
        id: 'req-3',
        residentId: '2',
        reason: 'Family visit',
        destination: '123 Main St',
        departureDate: new Date(now.getTime() + 172800000).toISOString(),
        returnDate: new Date(now.getTime() + 172800000 + 14400000).toISOString(),
        status: 'pending',
        signedOut: false,
        signedIn: false,
        createdAt: new Date(now.getTime() - 43200000).toISOString(),
      },
    ];
  }
}

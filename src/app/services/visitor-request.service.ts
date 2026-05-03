import { Injectable, signal } from '@angular/core';
import { VisitorRequest } from '../models';

type NewVisitorRequest = Omit<VisitorRequest, 'id' | 'status' | 'createdAt'>;

@Injectable({
  providedIn: 'root',
})
export class VisitorRequestService {
  private visitorRequests = signal<VisitorRequest[]>(this.initializeMockVisitorRequests());
  visitorRequests$ = this.visitorRequests.asReadonly();

  getRequestsForResident(residentId: string): VisitorRequest[] {
    return this.visitorRequests().filter((request) => request.residentId === residentId);
  }

  getPendingRequestsForResident(residentId: string): VisitorRequest[] {
    return this.getRequestsForResident(residentId).filter((request) => request.status === 'pending');
  }

  submitRequest(request: NewVisitorRequest): VisitorRequest {
    const newRequest: VisitorRequest = {
      ...request,
      id: this.generateId(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    this.visitorRequests.update((requests) => [...requests, newRequest]);
    return newRequest;
  }

  private generateId(): string {
    return `visit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeMockVisitorRequests(): VisitorRequest[] {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 86400000);
    const yesterday = new Date(now.getTime() - 86400000);

    return [
      {
        id: 'visit-1',
        residentId: '1',
        visitorName: 'Mary Doe',
        relationship: 'Mother',
        visitDate: tomorrow.toISOString(),
        expectedArrivalTime: '14:00',
        expectedDepartureTime: '16:00',
        purpose: 'Family visit and personal support',
        status: 'pending',
        createdAt: new Date(now.getTime() - 3600000).toISOString(),
      },
      {
        id: 'visit-2',
        residentId: '1',
        visitorName: 'Alex Green',
        relationship: 'Case worker',
        visitDate: yesterday.toISOString(),
        expectedArrivalTime: '10:00',
        expectedDepartureTime: '11:00',
        purpose: 'Scheduled check-in',
        status: 'approved',
        createdAt: new Date(now.getTime() - 172800000).toISOString(),
      },
    ];
  }
}

import { computed, Injectable, signal } from '@angular/core';
import { VisitorRequest } from '../models';

type NewVisitorRequest = Omit<
  VisitorRequest,
  'id' | 'status' | 'checkedIn' | 'checkedInAt' | 'checkedOut' | 'checkedOutAt' | 'createdAt'
>;

@Injectable({
  providedIn: 'root',
})
export class VisitorRequestService {
  private visitorRequests = signal<VisitorRequest[]>(this.initializeMockVisitorRequests());
  private activeVisitorRequestId = signal<string | null>(null);

  visitorRequests$ = this.visitorRequests.asReadonly();
  activeVisitorRequest$ = computed(() => {
    const requestId = this.activeVisitorRequestId();
    if (!requestId) return null;
    return this.getRequestById(requestId) ?? null;
  });

  get isVisitorAuthenticated(): boolean {
    return this.activeVisitorRequest$() !== null;
  }

  getRequestsForResident(residentId: string): VisitorRequest[] {
    return this.visitorRequests().filter((request) => request.residentId === residentId);
  }

  getPendingRequestsForResident(residentId: string): VisitorRequest[] {
    return this.getRequestsForResident(residentId).filter((request) => request.status === 'pending');
  }

  getRequestById(requestId: string): VisitorRequest | undefined {
    return this.visitorRequests().find((request) => request.id === requestId);
  }

  submitRequest(request: NewVisitorRequest): VisitorRequest {
    const newRequest: VisitorRequest = {
      ...request,
      id: this.generateId(),
      status: 'pending',
      checkedIn: false,
      checkedOut: false,
      createdAt: new Date().toISOString(),
    };

    this.visitorRequests.update((requests) => [...requests, newRequest]);
    return newRequest;
  }

  loginVisitor(visitorName: string): VisitorRequest | null {
    const normalizedName = visitorName.trim().toLowerCase();
    const request = this.visitorRequests().find(
      (visitorRequest) =>
        visitorRequest.status === 'approved' &&
        visitorRequest.visitorName.toLowerCase() === normalizedName &&
        !visitorRequest.checkedOut
    );

    if (!request) {
      this.activeVisitorRequestId.set(null);
      return null;
    }

    this.activeVisitorRequestId.set(request.id);
    return request;
  }

  logoutVisitor(): void {
    this.activeVisitorRequestId.set(null);
  }

  signInVisitor(): boolean {
    const request = this.activeVisitorRequest$();
    if (!request || request.status !== 'approved' || request.checkedIn || request.checkedOut) {
      return false;
    }

    this.visitorRequests.update((requests) =>
      requests.map((visitorRequest) =>
        visitorRequest.id === request.id
          ? { ...visitorRequest, checkedIn: true, checkedInAt: new Date().toISOString() }
          : visitorRequest
      )
    );
    return true;
  }

  signOutVisitor(): boolean {
    const request = this.activeVisitorRequest$();
    if (!request || !request.checkedIn || request.checkedOut) {
      return false;
    }

    this.visitorRequests.update((requests) =>
      requests.map((visitorRequest) =>
        visitorRequest.id === request.id
          ? { ...visitorRequest, checkedOut: true, checkedOutAt: new Date().toISOString() }
          : visitorRequest
      )
    );
    return true;
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
        checkedIn: false,
        checkedOut: false,
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
        checkedIn: false,
        checkedOut: false,
        createdAt: new Date(now.getTime() - 172800000).toISOString(),
      },
    ];
  }
}

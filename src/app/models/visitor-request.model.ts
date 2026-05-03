export type VisitorRequestStatus = 'pending' | 'approved' | 'rejected';

export interface VisitorRequest {
  id: string;
  residentId: string;
  visitorName: string;
  relationship: string;
  visitDate: string;
  expectedArrivalTime: string;
  expectedDepartureTime: string;
  purpose: string;
  status: VisitorRequestStatus;
  createdAt: string;
}

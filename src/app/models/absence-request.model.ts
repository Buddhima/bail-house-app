export type AbsenceStatus = 'pending' | 'approved' | 'rejected';

export interface AbsenceRequest {
  id: string;
  residentId: string;
  reason: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  status: AbsenceStatus;
  signedOut: boolean;
  signedOutAt?: string;
  signedIn: boolean;
  signedInAt?: string;
  createdAt: string;
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonItem,
  IonLabel,
  IonBadge,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AbsenceService } from '../../services/absence.service';
import { VisitorRequestService } from '../../services/visitor-request.service';
import { addCircleOutline, listOutline, exitOutline, peopleOutline } from 'ionicons/icons';

@Component({
  selector: 'bha-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonItem,
    IonLabel,
    IonBadge,
  ],
})
export class DashboardPage {
  private authService = inject(AuthService);
  private absenceService = inject(AbsenceService);
  private visitorRequestService = inject(VisitorRequestService);
  private router = inject(Router);

  addIcon = addCircleOutline;
  listIcon = listOutline;
  exitIcon = exitOutline;
  visitorsIcon = peopleOutline;

  get resident() {
    return this.authService.currentResident$();
  }

  get pendingRequestsCount(): number {
    if (!this.resident) return 0;
    return this.absenceService
      .getRequestsForResident(this.resident.id)
      .filter((r) => r.status === 'pending').length;
  }

  get pendingVisitorRequestsCount(): number {
    if (!this.resident) return 0;
    return this.visitorRequestService.getPendingRequestsForResident(this.resident.id).length;
  }

  get activeApprovedRequests() {
    if (!this.resident) return [];
    return this.absenceService
      .getApprovedActiveRequests(this.resident.id)
      .filter((r) => !r.signedIn);
  }

  submitRequest(): void {
    this.router.navigate(['/submit-request']);
  }

  submitVisitorRequest(): void {
    this.router.navigate(['/submit-visitor-request']);
  }

  viewRequests(): void {
    this.router.navigate(['/requests']);
  }

  signOutIn(): void {
    this.router.navigate(['/sign-out-in']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

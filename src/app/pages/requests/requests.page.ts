import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonBadge,
  IonButtons,
  IonBackButton,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { AbsenceService } from '../../services/absence.service';
import { VisitorRequestService } from '../../services/visitor-request.service';

@Component({
  selector: 'bha-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonBadge,
    IonButtons,
    IonBackButton,
    IonRefresher,
    IonRefresherContent,
  ],
})
export class RequestsPage {
  private authService = inject(AuthService);
  private absenceService = inject(AbsenceService);
  private visitorRequestService = inject(VisitorRequestService);

  get resident() {
    return this.authService.currentResident$();
  }

  get requests() {
    if (!this.resident) return [];
    return this.absenceService.getRequestsForResident(this.resident.id);
  }

  get visitorRequests() {
    if (!this.resident) return [];
    return this.visitorRequestService.getRequestsForResident(this.resident.id);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'danger';
      default:
        return 'medium';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'pending':
        return 'time-outline';
      case 'approved':
        return 'checkmark-circle-outline';
      case 'rejected':
        return 'close-circle-outline';
      default:
        return 'help-outline';
    }
  }

  handleRefresh(event: any): void {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}

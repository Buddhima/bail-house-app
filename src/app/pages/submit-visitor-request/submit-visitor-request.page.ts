import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { VisitorRequestService } from '../../services/visitor-request.service';

@Component({
  selector: 'bha-submit-visitor-request',
  templateUrl: './submit-visitor-request.page.html',
  styleUrls: ['./submit-visitor-request.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonAlert,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonTextarea,
    IonTitle,
    IonToolbar,
  ],
})
export class SubmitVisitorRequestPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private visitorRequestService = inject(VisitorRequestService);

  visitorName = '';
  relationship = '';
  visitDate = '';
  expectedArrivalTime = '';
  expectedDepartureTime = '';
  purpose = '';
  showSuccessAlert = false;

  get resident() {
    return this.authService.currentResident$();
  }

  get isFormValid(): boolean {
    return !!(
      this.visitorName.trim() &&
      this.relationship.trim() &&
      this.visitDate &&
      this.expectedArrivalTime &&
      this.expectedDepartureTime &&
      this.purpose.trim()
    );
  }

  submitRequest(): void {
    if (!this.resident || !this.isFormValid) return;

    this.visitorRequestService.submitRequest({
      residentId: this.resident.id,
      visitorName: this.visitorName.trim(),
      relationship: this.relationship.trim(),
      visitDate: new Date(`${this.visitDate}T00:00:00`).toISOString(),
      expectedArrivalTime: this.expectedArrivalTime,
      expectedDepartureTime: this.expectedDepartureTime,
      purpose: this.purpose.trim(),
    });

    this.visitorName = '';
    this.relationship = '';
    this.visitDate = '';
    this.expectedArrivalTime = '';
    this.expectedDepartureTime = '';
    this.purpose = '';
    this.showSuccessAlert = true;
  }

  onAlertDidDismiss(): void {
    this.router.navigate(['/requests']);
  }

  getMinDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  IonInput,
  IonTextarea,
  IonDatetime,
  IonButton,
  IonButtons,
  IonBackButton,
  IonAlert,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AbsenceService } from '../../services/absence.service';

@Component({
  selector: 'bha-submit-request',
  templateUrl: './submit-request.page.html',
  styleUrls: ['./submit-request.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
    IonInput,
    IonTextarea,
    IonDatetime,
    IonButton,
    IonButtons,
    IonBackButton,
    IonAlert,
  ],
})
export class SubmitRequestPage {
  private authService = inject(AuthService);
  private absenceService = inject(AbsenceService);
  private router = inject(Router);

  reason = '';
  destination = '';
  departureDate = '';
  returnDate = '';
  showSuccessAlert = false;

  get resident() {
    return this.authService.currentResident$();
  }

  get isFormValid(): boolean {
    return !!(
      this.reason.trim() &&
      this.destination.trim() &&
      this.departureDate &&
      this.returnDate
    );
  }

  submitRequest(): void {
    if (!this.resident || !this.isFormValid) return;

    this.absenceService.submitRequest({
      residentId: this.resident.id,
      reason: this.reason.trim(),
      destination: this.destination.trim(),
      departureDate: new Date(this.departureDate).toISOString(),
      returnDate: new Date(this.returnDate).toISOString(),
    });

    this.reason = '';
    this.destination = '';
    this.departureDate = '';
    this.returnDate = '';
    this.showSuccessAlert = true;
  }

  onAlertDidDismiss(): void {
    this.router.navigate(['/requests']);
  }

  getMinDate(): string {
    return new Date().toISOString();
  }
}

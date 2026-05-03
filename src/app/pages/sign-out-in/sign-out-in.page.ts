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
  IonButton,
  IonButtons,
  IonBackButton,
  IonAlert,
  IonIcon,
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { AbsenceService } from '../../services/absence.service';
import { logOutOutline, logInOutline } from 'ionicons/icons';

@Component({
  selector: 'bha-sign-out-in',
  templateUrl: './sign-out-in.page.html',
  styleUrls: ['./sign-out-in.page.scss'],
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
    IonButton,
    IonButtons,
    IonBackButton,
    IonAlert,
    IonIcon,
  ],
})
export class SignOutInPage {
  private authService = inject(AuthService);
  private absenceService = inject(AbsenceService);

  logoutIcon = logOutOutline;
  loginIcon = logInOutline;

  alertMessage = '';
  showAlert = false;

  get resident() {
    return this.authService.currentResident$();
  }

  get activeRequests() {
    if (!this.resident) return [];
    return this.absenceService.getApprovedActiveRequests(this.resident.id);
  }

  signOut(requestId: string): void {
    const success = this.absenceService.signOut(requestId);
    if (success) {
      this.alertMessage = 'Successfully signed out!';
    } else {
      this.alertMessage = 'Unable to sign out. Please try again.';
    }
    this.showAlert = true;
  }

  signIn(requestId: string): void {
    const success = this.absenceService.signIn(requestId);
    if (success) {
      this.alertMessage = 'Successfully signed in! Welcome back.';
    } else {
      this.alertMessage = 'Unable to sign in. Please try again.';
    }
    this.showAlert = true;
  }

  getFormattedDate(dateStr: string): string {
    return new Date(dateStr).toLocaleString();
  }
}

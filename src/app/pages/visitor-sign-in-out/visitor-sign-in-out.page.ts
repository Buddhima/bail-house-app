import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { logInOutline, logOutOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { VisitorRequestService } from '../../services/visitor-request.service';

@Component({
  selector: 'bha-visitor-sign-in-out',
  templateUrl: './visitor-sign-in-out.page.html',
  styleUrls: ['./visitor-sign-in-out.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonAlert,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonTitle,
    IonToolbar,
  ],
})
export class VisitorSignInOutPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private visitorRequestService = inject(VisitorRequestService);

  loginIcon = logInOutline;
  logoutIcon = logOutOutline;
  alertMessage = '';
  showAlert = false;

  get visitorRequest() {
    return this.visitorRequestService.activeVisitorRequest$();
  }

  get resident() {
    const request = this.visitorRequest;
    if (!request) return undefined;
    return this.authService.getResidentById(request.residentId);
  }

  signIn(): void {
    const success = this.visitorRequestService.signInVisitor();
    this.alertMessage = success
      ? 'Successfully signed in for your visit.'
      : 'Unable to sign in. Please ask staff for help.';
    this.showAlert = true;
  }

  signOut(): void {
    const success = this.visitorRequestService.signOutVisitor();
    this.alertMessage = success
      ? 'Successfully signed out. Thank you for visiting.'
      : 'Unable to sign out. Please ask staff for help.';
    this.showAlert = true;
  }

  finish(): void {
    this.visitorRequestService.logoutVisitor();
    this.router.navigate(['/login']);
  }

  getFormattedDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString();
  }

  getFormattedTime(dateStr?: string): string {
    return dateStr ? new Date(dateStr).toLocaleString() : '-';
  }
}

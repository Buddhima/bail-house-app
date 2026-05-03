import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonInput,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { VisitorRequestService } from '../../services/visitor-request.service';

@Component({
  selector: 'bha-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonInput,
  ],
})
export class LoginPage {
  private authService = inject(AuthService);
  private visitorRequestService = inject(VisitorRequestService);
  private router = inject(Router);

  selectedResidentId = '';
  visitorName = '';
  error = '';
  visitorError = '';

  get residents() {
    return this.authService.getResidents();
  }

  login(): void {
    if (!this.selectedResidentId) {
      this.error = 'Please select your name';
      return;
    }
    const resident = this.authService.login(this.selectedResidentId);
    if (resident) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Login failed. Please try again.';
    }
  }

  visitorLogin(): void {
    if (!this.visitorName.trim()) {
      this.visitorError = 'Please enter your visitor name';
      return;
    }

    const visitorRequest = this.visitorRequestService.loginVisitor(this.visitorName);
    if (visitorRequest) {
      this.router.navigate(['/visitor-sign-in-out']);
    } else {
      this.visitorError = 'No approved visitor request found for that name.';
    }
  }
}

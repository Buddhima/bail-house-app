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
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  ],
})
export class LoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  selectedResidentId = '';
  error = '';

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
}

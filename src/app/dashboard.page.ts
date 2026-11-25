import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, 
  IonCard, IonCardHeader, IonCardTitle, IonIcon 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addCircleOutline, listOutline, personCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterLink, 
    IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, 
    IonCard, IonCardHeader, IonCardTitle, IonIcon
  ]
})
export class DashboardPage {
  constructor() {
    addIcons({ addCircleOutline, listOutline, personCircleOutline });
  }
}

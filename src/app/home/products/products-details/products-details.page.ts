import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';




@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.page.html',
  styleUrls: ['./products-details.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard,  IonButton, IonInput, IonLabel, IonItem, IonList, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ProductsDetailsPage implements OnInit {


  constructor() { }

  ngOnInit(){
    
  }
}
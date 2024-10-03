import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonItem, IonLabel, IonList } from '@ionic/angular/standalone';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.page.html',
  styleUrls: ['./add-products.page.scss'],
  standalone: true,
  imports: [IonList, RouterLink, FormsModule, ReactiveFormsModule ,IonLabel, IonItem, IonIcon, IonButton, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AddProductsPage implements OnInit {

  addProductForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.addProductForm = new FormGroup({
      name: new  FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    })
  }

  addProduct(): void {
    console.log(this.addProductForm.value);
  }
}


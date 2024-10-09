import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/data/products';
import { IonHeader, IonButton, IonList, IonBackButton, IonToolbar, IonButtons, IonTitle, IonContent, IonIcon, IonModal, IonLabel } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-product',
  standalone: true,
  templateUrl: './add-products.page.html',
  styleUrls: ['./add-products.page.scss'],
  imports: [IonLabel, IonModal, IonIcon, FormsModule, IonContent, IonTitle, IonButtons, IonToolbar, IonHeader, IonButton, IonList, IonBackButton, CommonModule],
})

export class AddProductsPage {
  product: Product = { id: '', name: '', description: '', price: 0, status: true, rating: 0, cover: '', barcode: '' };
  imageUrl: string | undefined;
  constructor(private productService: ProductService, private alertController: AlertController) {}

  
    addProduct() {
      if (!this.product.name || !this.product.price) {
        console.error('Product name and price are required');
        return;
      }
    
      if (this.product.price <= 0) {
        console.error('Product price must be a positive number');
        return;
      }
    
      try {
        this.product.id = this.productService.generateId(); 
        this.productService.addProduct(this.product);
        this.resetForm();
        console.log('New product added');
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
    resetForm() {
      this.product = { id: '', name: '', description: '', price: 0, status: true, rating: 0, cover: '', barcode: '' };
    }
    generateId(): number {
      return parseInt(uuidv4().replace(/-/g, ''));
    }

    async takePicture() {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera 
      });
  
      this.imageUrl = image.path;
    }


    async selectPicture() {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos
      });
  
      this.imageUrl = image.path;
    }

    async showCameraOptions() {
      const alert = await this.alertController.create({
        header: 'Choose an option',
        buttons: [
          {
            text: 'Choose from Gallery',
            handler: () => {
              this.selectPicture();
            }
          },
          {
            text: 'Take Photo',
            handler: () => {
              this.takePicture();
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
  
      await alert.present();
    }
  }

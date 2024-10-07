import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonBackButton, IonList, IonItem, IonThumbnail, IonImg, IonLabel, IonText, IonIcon, IonModal, IonSkeletonText, IonSpinner } from '@ionic/angular/standalone';
import * as JsBarcode from 'jsbarcode';
import { ProductService } from 'src/app/services/product/product.service'; 
import { Product } from 'src/app/data/products';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink, CommonModule, IonSpinner, IonSkeletonText, IonModal, IonIcon, IonText, IonLabel, IonImg, IonItem, IonList, IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonThumbnail]
})
export class ProductsPage implements OnInit {
   items: Product[] = []; 
   itemModel: Product = {} as Product; 
   showBarcode = false;
   currency = 'Rs';
   loading: boolean = true;

   constructor(private productService: ProductService) { } 

   ngOnInit() {
     this.loadProducts(); 
   }

   loadProducts() {
     this.items = this.productService.getProducts(); 
   }

   getBarcodeData(item: Product) {
     this.itemModel = {...item};
     this.showBarcode = true;

     setTimeout(() => {
       this.getBarcode(item.barcode);
     }, 500);
   }

   getBarcode(barcode: string) {
     JsBarcode('#barcode', barcode, {
       lineColor: "#0aa",
       width: 4,
       height: 200,
       displayValue: false
     });
   }

   hideBarcodeData() {
     this.showBarcode = false;
   }

   onImageLoad() {
     this.loading = false;
   }

   onImageError() {
     this.loading = false;
   }
}

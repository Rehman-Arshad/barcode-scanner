import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonBackButton, IonList, IonItem, IonThumbnail, IonImg, IonLabel, IonText, IonIcon, IonModal } from '@ionic/angular/standalone';
import * as JsBarcode from 'jsbarcode';
import { products } from 'src/app/data/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [IonModal, IonIcon, IonText, IonLabel, IonImg, IonItem, IonList, IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonThumbnail]
})
export class ProductsPage implements OnInit {
   items: any[] = [];
   itemModel: any = {};
   showBarcode = false;
   currency = 'Rs';

  constructor() { }

  ngOnInit() {
    this.items = [...products];
  }


  getBarcodeData(item: any) {
    this.itemModel = {...item};
    this.showBarcode = true;
    
    setTimeout(() => {
      this.getBarcode(item.barcode);
    }, 500);
  }

  getBarcode(barcode: string){
    JsBarcode('#barcode', barcode, {
      lineColor: "#0aa",
      width:4,
      height:200,
      displayValue: false
    });

  }

  hideBarcodeData() {
    this.showBarcode = false;
  }
 

}

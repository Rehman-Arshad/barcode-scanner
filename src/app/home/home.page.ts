import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonItem, IonText, IonLabel, IonThumbnail, IonList, IonListHeader, IonRow, IonCol, IonCard, IonToast, IonBadge } from '@ionic/angular/standalone';
import { CartService } from '../services/cart/cart.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrl: 'home.page.scss',
  standalone: true,
  imports: [IonBadge, IonToast, IonCard, IonCol, IonRow, IonListHeader, IonList, IonText, IonItem, IonIcon, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonThumbnail, RouterLink],
})
export class HomePage implements OnInit, OnDestroy {
  isToast = false;
  toastData: any = {};
  totalItems: number = 0;
  cartSub!: Subscription;
   private cartService = inject(CartService);
  userName: string = '';


  constructor(public router: Router, public authService: AuthenticationService) {
   
  }

  ngOnInit(){
   this.cartSub = this.cartService.cart.subscribe({
    next: (cart) => {
      this.totalItems = cart?.totalItem ?? 0;
    }
  });
  this.getProfile();
  }

  async scanBarcode(){
  try {
    const code = await this.cartService.startScan();
    if(!code){
      this.isToast = true;
      this.toastData = {
        color: 'danger',
        message: 'no such barcode available'
      };
      return;
    }
    console.log(code);
    this.cartService.addItemByBarcode(code);
  } catch (e) {
    console.log(e);
  }
  }

  async scanAndPay (){
    try {
      const code = await this.cartService.startScan(0);
      if(!code){
        this.isToast = true;
        this.toastData = {
          color: 'danger',
          message: 'Error! here please try again'
        };
        return;
      }
        this.isToast = true;
        this.toastData = {
          color: 'success',
          message: 'Payment successful'
        };
      console.log(code);
    } catch (e) {
      console.log(e);
    }
    }

    ngOnDestroy(): void {
      if (this.cartSub) this.cartSub.unsubscribe();
  }


  async getProfile() {
    const profile = await this.authService.getProfile();
    this.userName = profile.displayName ?? '';
  }

  async logOut() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.log(error);
    });
  }
}

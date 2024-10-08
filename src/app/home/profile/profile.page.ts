import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonNote } from '@ionic/angular/standalone';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [RouterLink, IonNote, IonLabel, IonItem, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {

  user: string = '';
  constructor(public authService: AuthenticationService, public router: Router,) { 
    
  }

  ngOnInit() {
    this.getDetails();
  }


  async getDetails(){
    const profile = await this.authService.getProfile()
    this.user = profile;
  }

  async logOut() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.log(error);
    });
  }


}

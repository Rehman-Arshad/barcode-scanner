import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular'
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonIcon, IonFab, IonButton, IonText } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonText, IonButton, IonFab, IonIcon, IonInput, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class ResetPasswordPage implements OnInit {

  resetForm!: FormGroup;
  email : any;
  
  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    public router: Router) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
  });
}

async resetPassword(){
  if (this.resetForm.valid) {
    const emailControl = this.resetForm.get('email');
    if (emailControl) {
      this.authService.resetPassword(emailControl.value).then(()=>{
        this.router.navigate(['/login']);
        console.log("Reset Link Sent")
      }).catch((error)=>{
        console.log(error);
      })
    } else {
      console.log('Email control is null');
    }
  } else {
    console.log('Invalid form');
  }
}

}

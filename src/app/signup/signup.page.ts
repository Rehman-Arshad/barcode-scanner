import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { LoadingController } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonIcon, IonFabButton, IonFab, IonButton, IonText } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonText, ReactiveFormsModule, IonButton, IonFab, IonFabButton, IonIcon, IonInput, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
  , providers: [AuthenticationService]
})
export class SignupPage implements OnInit {
   
    regForm!: FormGroup;
   
  email: string = '';
  password: string = '';
  displayName: string = '';

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    public router: Router) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      displayName: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}')
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          )
        ]
      ]
    })
  }

  get errorControl () {
    return this.regForm?.controls
  }


  async registerUser(){
    if(this.regForm.valid){
      const loading = await this.loadingCtrl.create({
        message: 'Registering...',
        spinner: 'bubbles'
      });
      await loading.present();

      this.authService.registerUser(this.regForm.get('email')?.value,  this.regForm.get('password')?.value,  this.regForm.get('displayName')?.value,)
      .then(()=>{
        loading.dismiss();
          this.router.navigate(['/login']);
        })
        .catch((error) => {
          loading.dismiss();
          console.error('Error registering user:', error.message || 'Unknown error');
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular'
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFabButton, IonItem, IonInput, IonIcon, IonFab, IonButton, IonText } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonText, IonButton, IonFab, IonIcon, IonInput, IonItem, IonFabButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, ReactiveFormsModule]
  ,providers: [AuthenticationService]
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  email: string = '';
  password: string = '';

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    public router: Router) { }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
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
    return this.loginForm?.controls
  }

  async loginUser(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.loginForm?.valid){
      const user = await this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password,).catch((error) =>{
      console.log(error);
      loading.dismiss()
      })

      if(user){
        loading.dismiss()
        this.router.navigate(['/home'])
      }else{
        console.log("provide correct values");
      }
    }
  }

}

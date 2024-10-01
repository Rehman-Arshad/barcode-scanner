import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then(m => m.SignupPage)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./reset-password/reset-password.page').then(m => m.ResetPasswordPage)
  },
  {
    path: 'home',
    children: [
      {
        path: '',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage),
      },
      {
        path: 'products',
        loadComponent: () => import('./home/products/products.page').then(m => m.ProductsPage)
      },
      {
        path: 'cart',
        loadComponent: () => import('./home/cart/cart.page').then(m => m.CartPage)
      },
    ],
  },
];

import { Injectable } from '@angular/core';
import { products } from 'src/app/data/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: any[] = products;
  constructor() { }
  
  getProducts(): any[] {
    return this.products;
  }

  addProduct(product: any): void {
    this.products.push(product);
    console.log("I am pushed :" + product)
  }
}

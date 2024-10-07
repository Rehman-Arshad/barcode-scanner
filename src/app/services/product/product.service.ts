import { Injectable } from '@angular/core';
import { Product } from 'src/app/data/products'
import { products as initialProducts } from 'src/app/data/products'; 
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  generateId(): string {
    return uuidv4();
  }
  private products: Product[] = initialProducts;

  constructor() {}

  getProducts(): Product[] {
    return this.products;
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }
}


import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

@Component({
  selector: 'app-smart-products',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './smart-products.html',
  styleUrl: './smart-products.css',
})
export class SmartProductsComponent {
  title = 'Smart Products Board';
  isLoggedIn = false;
  userName = 'Karim';
  searchText = '';
  status: 'loading' | 'success' | 'error' | 'idle' = 'idle';

  private readonly baseProducts: Product[] = [
    { id: 1, name: 'Wireless Mouse', price: 250, category: 'Accessories', inStock: true },
    { id: 2, name: 'Mechanical Keyboard', price: 1200, category: 'Accessories', inStock: true },
    { id: 3, name: 'USB-C Hub', price: 600, category: 'Accessories', inStock: false },
    { id: 4, name: '27 Monitor', price: 4500, category: 'Displays', inStock: true },
  ];

  products: Product[] = [...this.baseProducts];

  statuses: Array<{ label: string; value: 'loading' | 'success' | 'error' | 'idle' }> = [
    { label: 'Loading', value: 'loading' },
    { label: 'Success', value: 'success' },
    { label: 'Error', value: 'error' },
    { label: 'Idle', value: 'idle' },
  ];

  get filteredProducts(): Product[] {
    const query = this.searchText.trim().toLowerCase();
    if (!query) {
      return this.products;
    }

    return this.products.filter((product) => product.name.toLowerCase().includes(query));
  }

  get productCount(): number {
    return this.filteredProducts.length;
  }

  login(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  setStatus(status: 'loading' | 'success' | 'error' | 'idle'): void {
    this.status = status;
  }

  clearProducts(): void {
    this.products = [];
    this.searchText = '';
  }

  resetProducts(): void {
    this.products = [...this.baseProducts];
    this.searchText = '';
    this.status = 'idle';
  }
}

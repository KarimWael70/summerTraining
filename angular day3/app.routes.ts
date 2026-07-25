import { Routes } from '@angular/router';
import { SmartProductsComponent } from './features/smart-products/smart-products';

export const routes: Routes = [
  { path: '', redirectTo: '/smart-products', pathMatch: 'full' },
  { path: 'smart-products', component: SmartProductsComponent },
];

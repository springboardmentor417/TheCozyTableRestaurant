import { Routes } from '@angular/router';
import { HomeComponent } from './orders/components/home/home.component';
import { HeaderComponent } from './orders/components/header/header.component';
import { CartComponent } from './orders/components/cart/cart.component';



export const routes: Routes = [
{path:'home', component:HomeComponent },
{path:'header', component: HeaderComponent },
{path:'cart', component: CartComponent },
{ path: '', redirectTo: 'home', pathMatch: 'full' }, 
];


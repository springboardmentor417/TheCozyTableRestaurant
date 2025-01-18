//team1
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './User profile -authentication/components/login/login.component';
import { HomeComponent } from './User profile -authentication/components/home/home.component';
import { RegisterComponent } from './User profile -authentication/components/register/register.component';
import { UpdateUserComponent } from './User profile -authentication/components/update-user/update-user.component';
import { DeleteUserComponent } from './User profile -authentication/components/delete-user/delete-user.component';
import { NgModule } from '@angular/core';
import { UserWelcomeComponent } from './User profile -authentication/components/user-welcome/user-welcome.component';
import { AdminWelcomeComponent } from './User profile -authentication/components/admin-welcome/admin-welcome.component';
import { UserDetailsComponent } from './User profile -authentication/components/user-details/user-details.component';
import { AddMenuItemComponent } from './menu-management/components/add-menu-item/add-menu-item.component';

import { HomeCartComponent } from './orders/components/home/homeCart.component';
import { HeaderComponent } from './orders/components/header/header.component';
import { CartComponent } from './orders/components/cart/cart.component';
import { OrderComponent } from './orders/components/order/order.component'; 
import { ReservationComponent } from './reservations/components/reservation/reservation.component';

import { FeedbackFormComponent } from './feedback/components/feedback-form/feedback-form.component';
import { AdminchartComponent } from './feedback/components/adminchart/adminchart.component';
import { AppComponent } from './app.component';
import { AckPageComponent } from './feedback/components/feedback-form/ack-page/ack-page.component';
import { PageFeedbackComponent } from './feedback/components/feedback-form/page-feedback/page-feedback.component';
import { MenuListComponent } from './menu-management/components/menu-list/menu-list.component';
import { MenuCategoryComponent } from './menu-management/menu-category/menu-category.component';
import { MenuItemNavComponent } from './menu-management/menu_nav/menu-item-nav.component';

export const routes: Routes = [
    {path:'login' ,component:LoginComponent },
    {path:'Home' ,component:HomeComponent},
    {path:'Register' , component:RegisterComponent},
    {path:'updateUser',component:UpdateUserComponent},
    {path:'deleteUser', component:DeleteUserComponent},
    { path: '', redirectTo: '/Home', pathMatch: 'full' },
    {path:'userWelcome' , component:UserWelcomeComponent},
    {path:'adminWelcome' , component:AdminWelcomeComponent},
    {path:'userDetails', component:UserDetailsComponent},

    {path:'reservation', component:ReservationComponent},

    { path: 'add-menu-item', component: AddMenuItemComponent },
    {path: 'app-menu-list',component:MenuListComponent},
    {path:'app-menu-category',component:MenuCategoryComponent},
    {path:'app-menu-item-nav',component:MenuItemNavComponent},
    {path:'homeCart', component:HomeCartComponent },
    {path:'header', component: HeaderComponent },
    {path:'cart', component: CartComponent },
    { path: 'order', component: OrderComponent },
    { path: 'menu', component: MenuItemNavComponent,

      children: [
        {
          path: 'add-menu-item',
          component: AddMenuItemComponent,
        },
        {
         path:'menu-list',
         component:MenuListComponent,
        },
        { path: 'menu-category',
          component: MenuCategoryComponent }
      ],      
     },
    {
    path: 'feedback',
    component: FeedbackFormComponent,
  },
  {
    path: 'admin',
    component: AdminchartComponent,
  },
  {
    path: 'ackpage',
    component: AckPageComponent,
  },
  {
    path: 'reply',
    component: PageFeedbackComponent,
  },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

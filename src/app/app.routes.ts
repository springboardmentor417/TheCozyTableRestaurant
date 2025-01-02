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

import { HomeComponent } from './orders/components/home/home.component';
import { HeaderComponent } from './orders/components/header/header.component';
import { CartComponent } from './orders/components/cart/cart.component';
import { OrderComponent } from './orders/components/order/order.component'; 


import { FeedbackFormComponent } from './feedback/components/feedback-form/feedback-form.component';
import { AdminchartComponent } from './feedback/adminComponent/adminchart/adminchart.component';
import { AppComponent } from './app.component';
import { AckPageComponent } from './feedback/components/feedback-form/ack-page/ack-page.component';
import { PageFeedbackComponent } from './feedback/components/feedback-form/page-feedback/page-feedback.component';


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

    { path: 'add-menu-item', component: AddMenuItemComponent },

    {path:'home', component:HomeComponent },
    {path:'header', component: HeaderComponent },
    {path:'cart', component: CartComponent },
    { path: 'order', component: OrderComponent },

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
  {
    path: '',
    redirectTo: 'feedback',
    pathMatch: 'full', // Default route
  },
   

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

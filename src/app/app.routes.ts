import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';

import { LoginComponent } from './User profile -authentication/components/login/login.component';
import { RegisterComponent } from './User profile -authentication/components/register/register.component';
import { UpdateUserComponent } from './User profile -authentication/components/update-user/update-user.component';
import { DeleteUserComponent } from './User profile -authentication/components/delete-user/delete-user.component';
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
import { AckPageComponent } from './feedback/components/feedback-form/ack-page/ack-page.component';
import { PageFeedbackComponent } from './feedback/components/feedback-form/page-feedback/page-feedback.component';

import { HomeComponent } from './User profile -authentication/components/home/home.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'userDetails', component: UserDetailsComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'adminWelcome', component: AdminWelcomeComponent },
  { path: 'reservation', component: ReservationComponent, canActivate: [authGuard] },
  { path: 'add-menu-item', component: AddMenuItemComponent },
  { path: 'homeCart', component: HomeCartComponent, canActivate: [authGuard] },
  { path: 'header', component: HeaderComponent },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'order', component: OrderComponent },
  { path: 'feedback', component: FeedbackFormComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminchartComponent },
  { path: 'ackpage', component: AckPageComponent },
  { path: 'reply', component: PageFeedbackComponent },
  
  {
    path: 'userDetails',
    component: UserDetailsComponent,
    children: [
      { path: 'updateUser', component: UpdateUserComponent },
      { path: 'deleteUser', component: DeleteUserComponent },
      { path: 'userWelcome', component: UserWelcomeComponent ,canActivate: [authGuard]},
      { path: '', redirectTo: 'userWelcome', pathMatch: 'full' }, // Default child route
    ],
  },
  
  { path: '', component: HomeComponent },  // Set HomeComponent as default route
  
  //Catch-all route, redirects to Home if no match
   { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

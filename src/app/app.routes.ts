import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './User profile -authentication/components/login/login.component';
import { HomeComponent } from './User profile -authentication/components/home/home.component';
import { RegisterComponent } from './User profile -authentication/components/register/register.component';
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
import { MenuListComponent } from './menu-management/components/menu-list/menu-list.component';
import { MenuCategoryComponent } from './menu-management/menu-category/menu-category.component';
import { MenuItemNavComponent } from './menu-management/menu_nav/menu-item-nav.component';
import { RedirectPageComponent } from './feedback/components/redirect-page/redirect-page.component';
import { AdminNavComponent } from './feedback/components/admin-nav/admin-nav.component';
import { ReplyPageComponent } from './feedback/adminComponent/reply-page/reply-page.component';
import { AboutusComponent } from './User profile -authentication/components/aboutus/aboutus.component';
import { AdmindetailsComponent } from './User profile -authentication/components/admindetails/admindetails.component';
import { authGuard } from './auth.guard';
import { ForgotPassComponent } from './User profile -authentication/components/forgot-pass/forgot-pass.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },  // Default route to HomeComponent
  { path: 'aboutus', component: AboutusComponent },
  { path: 'login', component: LoginComponent },
  { path: 'userDetails', component: UserDetailsComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'reservation', component: ReservationComponent, canActivate: [authGuard] },
  { path: 'add-menu-item', component: AddMenuItemComponent, },
  { path: 'app-menu-list', component: MenuListComponent },
  { path: 'app-menu-category', component: MenuCategoryComponent },
  { path: 'app-menu-item-nav', component: MenuItemNavComponent },
  {path: 'forgotPass' , component:ForgotPassComponent},
  {
    path: 'menu',
    component: MenuItemNavComponent,
    children: [
      { path: 'add-menu-item', component: AddMenuItemComponent },
      { path: 'menu-list', component: MenuListComponent },
      { path: 'menu-category', component: MenuCategoryComponent }
    ]
  },
  { path: 'homeCart', component: HomeCartComponent, canActivate: [authGuard] },
  { path: 'header', component: HeaderComponent },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'order', component: OrderComponent },
  { path: 'feedback', component: FeedbackFormComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminchartComponent },
  { path: 'ackpage', component: AckPageComponent },
  { path: 'reply', component: PageFeedbackComponent },

  { path: 'admindetails',component: AdmindetailsComponent,canActivate: [authGuard]},

  { path: 'redirect', component: RedirectPageComponent },

  {
    path: 'admin',
    component: AdminNavComponent,
    children: [
      { path: 'adminchart', component: AdminchartComponent },
      { path: 'adminreply', component: ReplyPageComponent }
    ]
  },
  {
    path: 'userDetails',component: UserDetailsComponent, canActivate: [authGuard],},
  { path: '**', redirectTo: '' }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

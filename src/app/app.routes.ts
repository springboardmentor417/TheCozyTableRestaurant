import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './User profile -authentication/components/login/login.component';
import { HomeComponent } from './User profile -authentication/components/home/home.component';
import { RegisterComponent } from './User profile -authentication/components/register/register.component';
import { UpdateUserComponent } from './User profile -authentication/components/update-user/update-user.component';
import { DeleteUserComponent } from './User profile -authentication/components/delete-user/delete-user.component';
import { NgModule } from '@angular/core';
import { UserWelcomeComponent } from './User profile -authentication/components/user-welcome/user-welcome.component';
import { AdminWelcomeComponent } from './User profile -authentication/components/admin-welcome/admin-welcome.component';

export const routes: Routes = [
    {path:'login' ,component:LoginComponent },
    {path:'Home' ,component:HomeComponent},
    {path:'Register' , component:RegisterComponent},
    {path:'updateUser',component:UpdateUserComponent},
    {path:'deleteUser', component:DeleteUserComponent},
    { path: '', redirectTo: '/Home', pathMatch: 'full' },
    {path:'userWelcome' , component:UserWelcomeComponent},
    {path:'adminWelcome' , component:AdminWelcomeComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
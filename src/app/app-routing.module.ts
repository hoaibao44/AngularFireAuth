import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAuthComponent } from './main-auth/main-auth.component';
import { RtdbComponent } from './rtdb/rtdb.component';
import { AuthGuard } from './service/auth-guard.service';


import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['sign-in']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['rtdb']);

const routes: Routes = [
  {path:'sign-in',component:MainAuthComponent},
  {path:'rtdb',component:RtdbComponent, canActivate: [AngularFireAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

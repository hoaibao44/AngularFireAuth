import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAuthComponent } from './main-auth/main-auth.component';
import { RtdbComponent } from './rtdb/rtdb.component';



const routes: Routes = [
  {path:'login',component:MainAuthComponent},
  {path:'rtdb',component:RtdbComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

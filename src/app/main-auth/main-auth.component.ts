import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-main-auth',
  templateUrl: './main-auth.component.html',
  styleUrls: ['./main-auth.component.scss']
})
export class MainAuthComponent {

  constructor(public authService: AuthService) {
  }

  login_google() {
    // this.authService.AuthLogin(this.authService.GoogleAuth());
    this.authService.GoogleAuth();
  }
  login_fb() {
    // this.authService.AuthLogin(this.authService.GoogleAuth());
    this.authService.FBAuth();
  }

  login_id(form:NgForm) {
    this.authService.afAuth.signInWithEmailAndPassword(form.value.email,form.value.password);
  }

  logout() {
    this.authService.SignOut();
  }

  reset_pass(form:NgForm){
    console.log('reset pass',form.value.email)
    this.authService.afAuth.sendPasswordResetEmail(form.value.email)
  }
}

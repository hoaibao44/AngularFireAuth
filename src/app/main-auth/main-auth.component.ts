import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-main-auth',
  templateUrl: './main-auth.component.html',
  styleUrls: ['./main-auth.component.scss']
})
export class MainAuthComponent {

  constructor(public auth: AngularFireAuth) {
  }

  login_google() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  login_id(form:NgForm) {
    this.auth.signInWithEmailAndPassword(form.value.email,form.value.password);
  }

  logout() {
    this.auth.signOut();
  }

}

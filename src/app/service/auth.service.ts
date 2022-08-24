import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  isCsLoggedIn :boolean = false;
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {

    // Setting logged in user in localstorage else null
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        this.isCsLoggedIn = true;
      } else {
        this.isCsLoggedIn = false;
      }
    });
  }

//   // Returns true when user is loged in and email is verified
//   get isLoggedIn(): boolean {
//     const user = JSON.parse(localStorage.getItem('user')!);
//     return user !== 'null' ? true : false;
//   }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Sign in with Facebook
  FBAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result: any) => {
        this.ngZone.run(() => {
          this.router.navigate(['sign-in']);
        });
      })
      .catch((error: any) => {
        window.alert(error);
      });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['sign-in']);
    });
  }
  
}
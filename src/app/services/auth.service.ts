import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, of as observableOf } from 'rxjs';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
import { AppUser } from '../models/app-user';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private userService: UserService) {
    this.user$ = afAuth.authState;
   }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
      return this.user$.pipe(
        switchMap(user =>  {
          if (user) return this.userService.get(user.uid);
          return observableOf(null);        
        }))
  }

  get appUserIsAdmin() {
      return this.appUser$.pipe(
      map(appUser => {
        console.log("appuser is admin: " + appUser.isAdmin);
        if (appUser.isAdmin == true) return true;
        else return false;    
        })    
      )
      
  }

}

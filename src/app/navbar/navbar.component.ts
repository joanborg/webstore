import { Component, Input, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AppUser } from '../models/app-user';



@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  appUser: AppUser;
 

  constructor(public auth: AuthService, private router: Router) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);  
   }



}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webstore';

  constructor(private userService: UserService, private router: Router, private auth: AuthService ) {
    auth.user$.subscribe(user => {
      if (user) {
        userService.save(user);     
      }
    })
  }

}

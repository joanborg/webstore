import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { switchMap, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { of as observableOf} from 'rxjs';
import { CanActivate } from '@angular/router';





@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  

  constructor(private auth: AuthService, private userService: UserService) { }

    canActivate(): Observable<boolean>  {
    
        return this.auth.appUser$.pipe(        
        map(appUser => {
          if (appUser.isAdmin == true) return true;
          else return false;    
          })    
        )  
    }
    
    


      
 }


 


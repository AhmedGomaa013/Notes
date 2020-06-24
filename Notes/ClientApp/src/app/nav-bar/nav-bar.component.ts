import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../shared/AuthService";
import { UserService } from "../shared/user-service";

@Component({
  selector: 'nav-bar-component',
  templateUrl:'./nav-bar.component.html'
})

export class NavBarComponent {
  constructor(private router: Router, private auth: AuthService, private userservice: UserService) { }

  user: string = "";
  
  onLogout() {
    this.userservice.logout().subscribe();
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigateByUrl('/');
  }

  getUsername() {
    return localStorage.getItem('username');
  }
  
}

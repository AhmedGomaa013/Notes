import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../shared/AuthService";


@Component({
  selector: 'nav-bar-component',
  templateUrl:'./nav-bar.component.html'
})

export class NavBarComponent {
  constructor(private router: Router, private auth: AuthService) { }
  
  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigateByUrl('/');
  }
}

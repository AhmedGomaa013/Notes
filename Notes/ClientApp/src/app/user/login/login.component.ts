import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ILoginUser } from "../../shared/login-user";
import { UserService } from "../../shared/user-service";
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../shared/AuthService";


@Component({
  selector: 'login-component',
  templateUrl:'./login.component.html'
})

export class LoginComponent implements OnInit {
  public constructor(private titleService: Title, private loginService: UserService, private router: Router,
    private toastrService: ToastrService, private auth: AuthService) { }

  errorMessage: string = "";
  connectionMade: boolean = false;

  user: ILoginUser = {
    username: "",
    password: ""
  };

  onLogin(): void {
    this.connectionMade = true;

    this.loginService.login(this.user).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', this.user.username);
        this.router.navigateByUrl(this.user.username);
      },
      err => {
        this.connectionMade = false;
        if (err.status == 400)
        {
          this.toastrService.error('Incorrect Username or Password', 'Authentication Failed');
        }
        else
        {
          console.log(err);
        }
      }
    );
    
  }

  ngOnInit(): void {
    if (this.auth.isLoggedIn())
      this.router.navigateByUrl(localStorage.getItem('username'));
    this.titleService.setTitle("Log In to Notes");

  }
}

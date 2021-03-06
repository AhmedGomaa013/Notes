import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { IRegisterUser } from "../../shared/register-user";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../shared/user-service";
import { Router } from "@angular/router";
import { AuthService } from "../../shared/AuthService";

@Component({
  selector: 'signup-component',
  templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit {
  public constructor(private titleService: Title, private service: UserService, private toastrService: ToastrService,
    private router: Router, private auth: AuthService) { }

  errorMessage: string = "";
  connectionMade:boolean = false;

  user: IRegisterUser = {
    username: "",
    password: "",
    confirmPassword:""
  }


  onCreate(): void {
    if (this.user.password == this.user.confirmPassword) {
      this.errorMessage = "";
      this.connectionMade = true;

      this.service.register(this.user)
        .subscribe(
          (response: any) => {
            if (response.succeeded) {
              this.toastrService.success("New User Created", "Registration Successful");
              this.errorMessage = "";
              this.router.navigateByUrl('login');
            }
            else {
              this.errorMessage = "";
              this.connectionMade = false;

              response.errors.forEach(element => {
                switch (element.code) {
                  case 'DuplicateUserName':
                    this.toastrService.error('Username is already taken', 'Registration failed.');
                    this.errorMessage = "Username is already taken";
                    break;

                  default:
                    this.toastrService.error(element.description, 'Registration failed.');
                    this.errorMessage += element.description;
                    this.errorMessage += '\n';
                    break;
                }
              });
            }
          },
          error => {
            this.connectionMade = false;
            console.log(error);
          }
        );
    }
    else {
      this.errorMessage = "Password and Confirm Password don't match";
    }
  }

  ngOnInit(): void {
    if (this.auth.isLoggedIn())
      this.router.navigateByUrl(localStorage.getItem('username'));
    this.titleService.setTitle("Create a Notes account");
    this.errorMessage = "";
  }
}

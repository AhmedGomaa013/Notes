import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { AuthService } from "../shared/AuthService";
import { Router } from "@angular/router";

@Component({
  selector: "home-component",
  templateUrl: "./home.component.html"
})

export class HomeComponent implements OnInit {

  public constructor(private titleService: Title, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn())
      this.router.navigateByUrl(localStorage.getItem('username'));
    this.titleService.setTitle("Notes");
  }
}

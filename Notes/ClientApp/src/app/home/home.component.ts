import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "home-component",
  templateUrl: "./home.component.html"
})

export class HomeComponent implements OnInit {

  public constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Notes");
  }
}

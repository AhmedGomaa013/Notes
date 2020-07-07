import { BrowserModule,Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { NotesModule } from './notes/notes.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: '**', component: HomeComponent }      
    ]),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
    UserModule,
    NotesModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule,Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotesComponent } from './notes/notes.component'
import { OpenDialogComponent } from './dialog/open-dialog.component'
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive';
import { DataService } from './shared/data-service';
import { UserService } from './shared/user-service';
import { AuthService } from './shared/AuthService';
import { AuthInterceptor } from './shared/auth-inerceptor';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    NotesComponent,
    ConfirmEqualValidatorDirective,
    OpenDialogComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: ':user', component: NotesComponent },
      { path: 'dialog', component: OpenDialogComponent },
      { path: '**', component: HomeComponent }
      
    ]),
    BrowserAnimationsModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    CommonModule
  ],
  providers: [Title,
    DataService,
    UserService,
    AuthService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

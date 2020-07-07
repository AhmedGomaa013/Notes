import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    RouterModule.forChild([
      {path:'login', component:LoginComponent},
      {path:'signup',component:SignupComponent}
    ]),
    SharedModule
  ],
  providers:[],
  exports:[]
})
export class UserModule { }

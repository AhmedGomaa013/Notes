import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ConfirmEqualValidatorDirective } from './confirm-equal-validator.directive';
import { DataService } from './data-service';
import { UserService } from './user-service';
import { AuthService } from './AuthService';
import { AuthInterceptor } from './auth-inerceptor';



@NgModule({
  declarations: [
    ConfirmEqualValidatorDirective
  ],
  imports: [CommonModule,FormsModule,HttpClientModule],
  providers:[DataService,UserService,AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  exports: [CommonModule, FormsModule, HttpClientModule, ConfirmEqualValidatorDirective]
})
export class SharedModule { }

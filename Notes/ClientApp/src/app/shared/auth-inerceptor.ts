import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') != null) {
      const clonedreq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      });

      return next.handle(clonedreq).pipe(
        tap(
          success => { },
          err => {
            if (err.status == 401)
            {
              localStorage.removeItem('token');
              localStorage.removeItem('username');
              this.router.navigateByUrl('login');
            }
          }
        )
      );
    }
    else
    {
      return next.handle(req.clone());
    }
    }
}

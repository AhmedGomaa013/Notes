import { Injectable } from "@angular/core";
import { IRegisterUser } from "./register-user";
import { HttpClient, HttpHeaderResponse } from "@angular/common/http";
import { ILoginUser } from "./login-user";

@Injectable()

export class UserService {
  constructor(private http: HttpClient) { }

  readonly baseUrl: string = 'api/Account/'
  register(user: IRegisterUser) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  login(user: ILoginUser) {
    return this.http.post(this.baseUrl + 'login', user);
  }
}

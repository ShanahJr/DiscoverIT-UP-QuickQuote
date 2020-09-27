import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { from, Observable } from "rxjs";
import { User } from "src/app/Models/User/user";
import { LoginVM } from "src/app/Models/ViewModels/LoginVM";

@Injectable({
  providedIn: "root",
})
export class UserService {
  public RootUrl: string;
  public httpOptions: any;

  public UserID: number;

  constructor(private http: HttpClient) {
    this.RootUrl = "https://localhost:5001/api/User/";
    this.httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
  }

  RegisterUser(user: User) {
    return this.http.post<User>(this.RootUrl, user);
  }

  Login(Login: LoginVM) {
    return this.http.post<any>(this.RootUrl + "Login", Login);
  }
}

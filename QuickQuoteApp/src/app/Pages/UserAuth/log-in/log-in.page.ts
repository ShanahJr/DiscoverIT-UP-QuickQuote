import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { take } from "rxjs/operators";
import { User } from "src/app/Models/User/user";
import { LoginVM } from "src/app/Models/ViewModels/LoginVM";
import { UserService } from "src/app/Services/User/user.service";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.page.html",
  styleUrls: ["./log-in.page.scss"],
})
export class LogInPage implements OnInit {
  LoginForm: any;
  errorMessage: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.LoginForm = new FormGroup({
      UserPassword: new FormControl("", [Validators.required]),
      UserEmail: new FormControl("", [Validators.required, Validators.email]),
    });
  }

  LogIn() {
    var Login: LoginVM = this.LoginForm.value;
    this.userService
      .Login(Login)
      .pipe(take(1))
      .subscribe((res) => {
        localStorage.setItem("UserToken", res.token);
        this.router.navigate(["/home"]);
      });
  }
}

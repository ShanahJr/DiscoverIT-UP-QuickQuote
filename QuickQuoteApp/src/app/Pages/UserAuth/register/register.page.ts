import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { take } from "rxjs/operators";
import { User } from "src/app/Models/User/user";
import { UserService } from "src/app/Services/User/user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  ConfirmPassword: string = "";
  ConfirmationError: string;
  errorMessage: string;

  MessageHeader = "";
  MessageBody = "";
  isError = false;
  RegisterForm: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.RegisterForm = new FormGroup({
      UserName: new FormControl("", [Validators.required]),
      UserSurname: new FormControl("", [Validators.required]),
      UserPassword: new FormControl("", [Validators.required]),
      UserCellNo: new FormControl("", [Validators.required]),
      UserSuburb: new FormControl("", [Validators.required]),
      UserEmail: new FormControl("", [Validators.required, Validators.email]),
    });
  }

  RegisterUser() {
    var NewUser: User = this.RegisterForm.value;

    this.userService
      .RegisterUser(NewUser)
      .pipe(take(1))
      .subscribe(
        (user) => {
          console.log(user);
          this.router.navigate(["/log-in"]);
        },
        (err) => {
          debugger;
        }
      );
  }

  CheckPassword(Password: string, ConfirmationPassword: string): boolean {
    if (Password == ConfirmationPassword) {
      this.ConfirmationError = "";
      return true;
    } else {
      if (this.ConfirmPassword != "") {
        this.ConfirmationError =
          "Password and confirmation password do not match";
        return false;
      }

      this.ConfirmationError = "";
      return false;
    }
  } // Check password function
}

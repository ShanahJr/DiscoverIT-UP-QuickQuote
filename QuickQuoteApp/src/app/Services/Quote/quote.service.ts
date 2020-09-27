import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { from, Observable } from "rxjs";
import { FileVM } from "src/app/Models/ViewModels/FileVM";
import { Quote } from "src/app/Models/Quote/quote";
import { UserService } from "../User/user.service";
import { LabelVM } from "src/app/Models/ViewModels/LabelVM";

@Injectable({
  providedIn: "root",
})
export class QuoteService {
  public RootUrl: string;
  public httpOptions: any;

  public QuoteID: number;

  constructor(private http: HttpClient, private userService: UserService) {
    // this.RootUrl = "https://localhost:6002/api/User/Login";
    this.RootUrl = "https://localhost:5001/api/Quote/";
    this.httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
  }

  GetQuotes() {
    return this.http.get<Quote[]>(
      this.RootUrl + "GetUserQuotes/" + this.userService.UserID
    );
  }

  UploadImage(FileToUpload: FileVM) {
    return this.http.post<LabelVM[]>(this.RootUrl + "PostImage", FileToUpload);
  }
  // UploadImage(FileToUpload: FileVM) {
  //   return this.http.post<FileVM>(this.RootUrl, FileToUpload);
  // }

  CreateQuote() {
    debugger;
    let newQuote = new Quote();
    newQuote.UserID = this.userService.UserID;
    return this.http.post<Quote>(this.RootUrl, newQuote);
  }
}

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { from, Observable } from "rxjs";
import { FileVM } from "src/app/Models/ViewModels/FileVM";

@Injectable({
  providedIn: "root",
})
export class QuoteService {
  public RootUrl: string;
  public httpOptions: any;

  constructor(private http: HttpClient) {
    // this.RootUrl = "https://localhost:6002/api/User/Login";
    this.RootUrl = "https://localhost:5001/api/Quote/";
    this.httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
  }

  UploadImage(FileToUpload: FileVM) {
    return this.http.post<FileVM>(this.RootUrl + "PostImage", FileToUpload);
  }
  // UploadImage(FileToUpload: FileVM) {
  //   return this.http.post<FileVM>(this.RootUrl, FileToUpload);
  // }

  CreateQuote() {}
}

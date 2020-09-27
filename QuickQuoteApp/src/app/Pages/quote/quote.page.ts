import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RekognitionClient } from "@aws-sdk/client-rekognition-browser/RekognitionClient";
import * as AWS from "@aws-sdk/client-rekognition-browser/Rekognition";
//let fileUpload = require("fuctbase64");
import * as fileUpload from "fuctbase64";

import {
  Plugins,
  CameraResultType,
  CameraSource,
  CameraDirection,
  Camera,
} from "@capacitor/core";
import { Platform, ActionSheetController } from "@ionic/angular";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { QuoteService } from "../../Services/Quote/quote.service";
import { FileVM } from "src/app/Models/ViewModels/FileVM";
import { take } from "rxjs/operators";
import { Quote } from "src/app/Models/Quote/quote";

@Component({
  selector: "app-quote",
  templateUrl: "./quote.page.html",
  styleUrls: ["./quote.page.scss"],
})
export class QuotePage implements OnInit {
  private ErrorMessage: string;
  public message: string;
  Logo: string;
  isLogoAvailable = false;
  TempLogo: string;
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;

  TheImage: any = null;
  FileString: string = "";
  QuoteList: Quote[] = [];

  constructor(
    //public rekognition: RekognitionClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private actionSheetCtrl: ActionSheetController,
    private plt: Platform,
    private sanitizer: DomSanitizer,
    private QuoteService: QuoteService
  ) {}
  // constructor(  ) { }

  //public rekognitions = new AWS.Rekognition(  );

  ngOnInit() {
    //const config = new AWS.Con
    this.GetQuotes();
  }

  GetQuotes() {
    this.QuoteService.GetQuotes()
      .pipe(take(5))
      .subscribe((quotes) => {
        console.log(quotes);
        this.QuoteList = quotes;
      });
  }

  CreateQuote() {
    this.QuoteService.CreateQuote().subscribe((quote) => {
      this.QuoteService.QuoteID = quote.QuoteID;
      this.router.navigate(["/quote/quote-list"]);
    });
  }
}

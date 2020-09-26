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
  }

  transformer() {
    if (this.isLogoAvailable) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        "data:image;base64," + this.Logo
      );
    } else {
      return "../../../../assets/NoImage.jpg";
    }
  }

  async SendPictureToAPI(event: EventTarget) {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file: File = target.files[0];

    let UploadFile = new FileVM();
    UploadFile.Filename = file.name;

    let reader = new FileReader();

    //console.log("just a place holder");

    reader.readAsDataURL(file);

    reader.onload = () => {
      //Store base64 encoded representation of file
      UploadFile.FileAsBase64 = reader.result
        .toString()
        .substring(reader.result.toString().indexOf(",") + 1);

      //POST to server
      this.QuoteService.UploadImage(UploadFile)
        .pipe(take(1))
        .subscribe((res) => {
          console.log("Technically image should be by the API now");
        });
    };

    //await reader.readAsDataURL(file);

    //let res = reader.result.toString();

    //UploadFile.FileAsBase64 = res.substring(res.indexOf(",") + 1);
    // UploadFile.FileAsBase64 = reader.result
    //   .toString()
    //   .substring(reader.result.toString().indexOf(",") + 1);

    //UploadFile.FileAsBase64 = await this.ConvertFile(file);

    // debugger;

    // this.QuoteService.UploadImage(UploadFile)
    //   .pipe(take(1))
    //   .subscribe((res) => {
    //     console.log("Technically image should be by the API now");
    //   });
  }

  async ConvertFile(file: File) {
    let reader = new FileReader();

    console.log("just a place holder");

    reader.readAsDataURL(file);

    reader.onload = () => {
      return reader.result
        .toString()
        .substring(reader.result.toString().indexOf(",") + 1);
    };

    //let res = reader.result.toString();

    //UploadFile.FileAsBase64 = res.substring(res.indexOf(",") + 1);
  }

  imgToBase64(img) {
    debugger;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;

    // I think this won't work inside the function from the console
    img.crossOrigin = "anonymous";

    ctx.drawImage(img, 0, 0);

    return canvas.toDataURL();
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.FileString = btoa(binaryString); // Converting binary string data.
  }

  async selectImageSource() {
    const buttons = [
      {
        text: "Take Photo",
        icon: "camera",
        handler: () => {
          this.addImage(CameraSource.Camera);
        },
      },
      {
        text: "Gallery",
        icon: "image",
        handler: () => {
          this.addImage(CameraSource.Photos);
        },
      },
    ];

    // Only allow file selection inside a browser
    if (!this.plt.is("hybrid")) {
      buttons.push({
        text: "Choose a File",
        icon: "attach",
        handler: () => {
          this.fileInput.nativeElement.click();
        },
      });
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: "Select Image Source",
      buttons,
    });
    await actionSheet.present();
  } // End of select image source

  async addImage(source: CameraSource) {
    console.log("I clicked on Gallery");
    var image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source,
    });
    this.isLogoAvailable = true;
    this.Logo = image.base64String;
    console.log(this.Logo);
    // this.InjectImage();
  }
}

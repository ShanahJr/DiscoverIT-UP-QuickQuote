import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ActionSheetController, Platform } from "@ionic/angular";
import { take } from "rxjs/operators";
import { FileVM } from "src/app/Models/ViewModels/FileVM";
import { QuoteService } from "../../../Services/Quote/quote.service";

import * as Bootstrap from "../../../../../node_modules/bootstrap/dist/js/bootstrap.min.js";

import {
  Plugins,
  CameraResultType,
  CameraSource,
  CameraDirection,
  Camera,
} from "@capacitor/core";
import { LabelVM } from "src/app/Models/ViewModels/LabelVM";

@Component({
  selector: "app-quote-list",
  templateUrl: "./quote-list.page.html",
  styleUrls: ["./quote-list.page.scss"],
})
export class QuoteListPage implements OnInit {
  private ErrorMessage: string;
  public message: string;
  Logo: string;
  isLogoAvailable = false;
  TempLogo: string;
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;

  TheImage: any = null;
  FileString: string = "";

  public LabelList: LabelVM[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private actionSheetCtrl: ActionSheetController,
    private plt: Platform,
    private sanitizer: DomSanitizer,
    private QuoteService: QuoteService
  ) {}

  ngOnInit() {}

  // transformer() {
  //   if (this.isLogoAvailable) {
  //     return this.sanitizer.bypassSecurityTrustResourceUrl(
  //       "data:image;base64," + this.Logo
  //     );
  //   } else {
  //     return "../../../../assets/NoImage.jpg";
  //   }
  // }

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
          this.LabelList = res;
          console.log(res);

          var myModal = new Bootstrap.Modal(
            document.getElementById("QuoteListModal")
          );
          myModal.show();
        });
    };
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

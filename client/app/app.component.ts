import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data: Array<Array<any>> = [];
  fileToUpload: any;
  currentFile: any;
  errorMessage: string;

  @ViewChild('file', {read: ElementRef}) file: ElementRef;

  constructor(private readonly appService: AppService) {}

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
    }
  }

  onSubmit(): void {
    this.currentFile = undefined;
    this.errorMessage = undefined;
    this.appService.upload(this.fileToUpload).subscribe((results: Array<Array<any>>) => {
      this.currentFile = this.fileToUpload;
      this.data = results;
    }, (err: any) => {
      this.errorMessage = 'An error has occurred! Please check the console for more details.';
      console.error(err);
    }, () => {
      this.fileToUpload = undefined;
      this.file.nativeElement.value = '';
    });
  }
}

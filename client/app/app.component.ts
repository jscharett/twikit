import { Component } from '@angular/core';
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

  constructor(private readonly appService: AppService) {}

  onSubmit(): void {
    this.appService.upload(this.fileToUpload).subscribe((results: Array<Array<any>>) => {
      this.currentFile = this.fileToUpload;
      this.fileToUpload = undefined;
      this.data = results;
    });
  }
}

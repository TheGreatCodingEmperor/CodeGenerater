import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CefCustomObjectService } from 'src/app/core/cef-custom-object.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit,AfterViewInit {
  filePath:string = "";
  folderPath:string = "";
  constructor(
    private cefCustomObject: CefCustomObjectService
  ) {}

  async ngOnInit() {
    this.cefCustomObject.showDevTools();
    alert(await this.cefCustomObject.doSomeThing('jason','sing'));
  }

  ngAfterViewInit(){
    console.log(this.filePath);
    console.log(this.folderPath);
  }

  async selectFile(e){
    this.filePath = await this.cefCustomObject.selectedFilePath();
  }

  async selectFolder(e){
    this.folderPath = await this.cefCustomObject.selectedFolderPath();
  }
}

import { Component, OnInit } from '@angular/core';
import { CefCustomObjectService } from 'src/app/core/cef-custom-object.service';

@Component({
  selector: 'app-cef-example',
  templateUrl: './cef-example.component.html',
  styleUrls: ['./cef-example.component.scss']
})
export class CefExampleComponent implements OnInit {
  filePath:string = "";
  folderPath:string = "";
  constructor(
    private cefCustomObject: CefCustomObjectService
  ) {}

  async ngOnInit() {
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

  async sendMessage(){
    alert(await this.cefCustomObject.doSomeThing('jason','sing'));
  }
}

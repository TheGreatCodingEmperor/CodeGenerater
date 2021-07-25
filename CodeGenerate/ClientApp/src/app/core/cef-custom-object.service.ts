import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs';

export interface IActionResult {
  StatusCode: number;
  Value: any;
}

@Injectable({
  providedIn: 'root',
})
export class CefCustomObjectService {
  cefCustomObject = window['cefCustomObject'];
  constructor() {}
  sayHello() {
    if (this.cefCustomObject) return this.cefCustomObject.sayHello();
  }
  showDevTools() {
    if (this.cefCustomObject) return this.cefCustomObject.showDevTools();
  }
  refreshWindow() {
    if (this.cefCustomObject) return this.cefCustomObject.refreshWindow();
  }
  selectedFolderPath() {
    if (this.cefCustomObject) return this.cefCustomObject.selectedFolderPath();
  }
  selectedFilePath() {
    if (this.cefCustomObject) return this.cefCustomObject.selectedFilePath();
  }
  readFileAsText(path) {
    if (this.cefCustomObject) return this.cefCustomObject.readFileAsText(path);
  }
  writeFileToPath(path, content) {
    if (this.cefCustomObject)
      return this.cefCustomObject.writeFileToPath(path, content);
  }
  createDirectory(path) {
    if (this.cefCustomObject) return this.cefCustomObject.createDirectory(path);
  }
  openFolder(path) {
    if (this.cefCustomObject) return this.cefCustomObject.openFolder(path);
  }
  doSomeThing(name, action) {
    if (this.cefCustomObject)
      return this.cefCustomObject.doSomeThing(name, action);
  }
  api() {
    if (this.cefCustomObject) return this.cefCustomObject.api();
  }
}

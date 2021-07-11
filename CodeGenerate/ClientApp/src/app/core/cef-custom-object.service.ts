import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CefCustomObjectService {
  cefCustomObject = window['cefCustomObject'];
  constructor() {}
  sayHello(){return this.cefCustomObject.sayHello();}
showDevTools(){return this.cefCustomObject.showDevTools();}
refreshWindow(){return this.cefCustomObject.refreshWindow();}
selectedFolderPath(){return this.cefCustomObject.selectedFolderPath();}
selectedFilePath(){return this.cefCustomObject.selectedFilePath();}
doSomeThing(name,action){return this.cefCustomObject.doSomeThing(name,action);}
}

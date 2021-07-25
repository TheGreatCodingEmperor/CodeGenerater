import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CefCustomObjectService } from './core/cef-custom-object.service';
import { map } from 'rxjs/operators';
import { CefExampleComponent } from './modules/generater/components/cef-example/cef-example.component';

export interface IActionResult{
  StatusCode:number;
  Value:any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'code-generater';
  modes=[
    { label:'---',value:'' },
    { label:'example',value:'/generater/example' },
    { label:'dotnet',value:'/generater/dotnet' }
  ]
  constructor(
    private router: Router,
    private cefCustomObject: CefCustomObjectService
  ) {}

  async ngOnInit() {
    document.querySelector('body').addEventListener('keydown', (e) => {
      var keyCode = e.keyCode || e.which;
      var keys = e.key;
      switch (keyCode) {
        //F5 refresh
        case 116: {
          this.cefCustomObject.refreshWindow();
          break;
        }
        //F12 dev tool
        case 123: {
          this.cefCustomObject.showDevTools();
          break;
        }
        case 13: {
          // this.cefCustomObject.showDevTools();
          // this.cefCustomObject.api().pipe(map((result:IActionResult)=>{

          // }));
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  goToGenerater() {
    this.router.navigate(['/generater']);
  }

  goToPage(event){
    this.router.navigate([event.value]);
  }
}

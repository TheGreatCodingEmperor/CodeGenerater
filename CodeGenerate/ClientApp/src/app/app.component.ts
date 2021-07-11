import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CefCustomObjectService } from './core/cef-custom-object.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'code-generater';
  constructor(
    private router: Router,
    private cefCustomObject: CefCustomObjectService
  ) {}

  ngOnInit() {
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
          this.cefCustomObject.sayHello();
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
}

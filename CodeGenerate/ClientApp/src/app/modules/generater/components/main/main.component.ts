import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CefCustomObjectService } from 'src/app/core/cef-custom-object.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit,AfterViewInit {
  constructor(
    private cefCustomObject: CefCustomObjectService
  ) {}

  async ngOnInit() {
  }

  ngAfterViewInit(){
  }
}

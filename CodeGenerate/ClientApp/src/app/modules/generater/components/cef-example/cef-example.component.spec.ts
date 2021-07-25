import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CefExampleComponent } from './cef-example.component';

describe('CefExampleComponent', () => {
  let component: CefExampleComponent;
  let fixture: ComponentFixture<CefExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CefExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CefExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

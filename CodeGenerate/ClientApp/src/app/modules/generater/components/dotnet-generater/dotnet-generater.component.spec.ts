import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotnetGeneraterComponent } from './dotnet-generater.component';

describe('DotnetGeneraterComponent', () => {
  let component: DotnetGeneraterComponent;
  let fixture: ComponentFixture<DotnetGeneraterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DotnetGeneraterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DotnetGeneraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

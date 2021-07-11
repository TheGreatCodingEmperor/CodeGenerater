import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneraterRoutingModule } from './generater-routing.module';
import { MainComponent } from './components/main/main.component';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DotnetGeneraterComponent } from './components/dotnet-generater/dotnet-generater.component';


@NgModule({
  declarations: [
    MainComponent,
    DotnetGeneraterComponent
  ],
  imports: [
    CommonModule,
    GeneraterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNgModule
  ]
})
export class GeneraterModule { }

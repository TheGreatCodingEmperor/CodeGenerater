import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CefExampleComponent } from './components/cef-example/cef-example.component';
import { DotnetGeneraterComponent } from './components/dotnet-generater/dotnet-generater.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'example', component: CefExampleComponent },
  { path: 'dotnet', component: DotnetGeneraterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneraterRoutingModule {}

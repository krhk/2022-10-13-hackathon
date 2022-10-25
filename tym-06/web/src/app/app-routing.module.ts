import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SbirkaComponent } from './sbirka/sbirka.component';
import { ZadostComponent } from './zadost/zadost.component';

const routes: Routes = [{
  path: "",
  component: HomePageComponent
}, {path: "sbirka/:id", component: SbirkaComponent}, {path: "zadost", component: ZadostComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

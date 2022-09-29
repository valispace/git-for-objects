import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppChartComponent } from './chart/chart.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

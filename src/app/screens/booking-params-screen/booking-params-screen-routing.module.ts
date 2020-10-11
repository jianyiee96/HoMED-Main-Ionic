import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingParamsScreenPage } from './booking-params-screen.page';

const routes: Routes = [
  {
    path: '',
    component: BookingParamsScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingParamsScreenPageRoutingModule {}

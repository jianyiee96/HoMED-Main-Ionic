import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingScreenPage } from './booking-screen.page';

const routes: Routes = [
  {
    path: '',
    component: BookingScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingScreenPageRoutingModule {}

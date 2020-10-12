import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingSlotsScreenPage } from './booking-slots-screen.page';

const routes: Routes = [
  {
    path: '',
    component: BookingSlotsScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingSlotsScreenPageRoutingModule {}

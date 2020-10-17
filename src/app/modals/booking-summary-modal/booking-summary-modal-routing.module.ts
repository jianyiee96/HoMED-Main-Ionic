import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingSummaryModalPage } from './booking-summary-modal.page';

const routes: Routes = [
  {
    path: '',
    component: BookingSummaryModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingSummaryModalPageRoutingModule {}

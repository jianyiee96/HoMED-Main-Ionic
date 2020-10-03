import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewSubmittedFormModalPage } from './view-submitted-form-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ViewSubmittedFormModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewSubmittedFormModalPageRoutingModule {}

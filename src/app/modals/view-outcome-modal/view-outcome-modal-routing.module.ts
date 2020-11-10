import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewOutcomeModalPage } from './view-outcome-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ViewOutcomeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewOutcomeModalPageRoutingModule {}

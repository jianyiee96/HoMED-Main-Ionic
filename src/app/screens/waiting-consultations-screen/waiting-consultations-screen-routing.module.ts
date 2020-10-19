import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaitingConsultationsScreenPage } from './waiting-consultations-screen.page';

const routes: Routes = [
  {
    path: '',
    component: WaitingConsultationsScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaitingConsultationsScreenPageRoutingModule {}

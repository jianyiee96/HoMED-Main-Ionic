import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletedConsultationsScreenPage } from './completed-consultations-screen.page';

const routes: Routes = [
  {
    path: '',
    component: CompletedConsultationsScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletedConsultationsScreenPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultationScreenPage } from './consultation-screen.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultationScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultationScreenPageRoutingModule {}

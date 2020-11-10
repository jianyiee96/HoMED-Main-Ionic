import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalBoardScreenPage } from './medical-board-screen.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalBoardScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalBoardScreenPageRoutingModule {}

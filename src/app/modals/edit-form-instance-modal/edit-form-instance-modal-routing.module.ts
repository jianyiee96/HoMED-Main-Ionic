import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditFormInstanceModalPage } from './edit-form-instance-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditFormInstanceModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFormInstanceModalPageRoutingModule {}

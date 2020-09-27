import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewFormTemplateModalPage } from './view-form-template-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ViewFormTemplateModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewFormTemplateModalPageRoutingModule {}

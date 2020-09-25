import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormScreenPage } from './form-screen.page';

const routes: Routes = [
  {
    path: '',
    component: FormScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormScreenPageRoutingModule {}

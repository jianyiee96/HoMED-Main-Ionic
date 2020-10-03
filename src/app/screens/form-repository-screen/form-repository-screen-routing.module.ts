import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormRepositoryScreenPage } from './form-repository-screen.page';

const routes: Routes = [
  {
    path: '',
    component: FormRepositoryScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRepositoryScreenPageRoutingModule {}

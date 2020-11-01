import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationScreenPage } from './notification-screen.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationScreenPageRoutingModule {}

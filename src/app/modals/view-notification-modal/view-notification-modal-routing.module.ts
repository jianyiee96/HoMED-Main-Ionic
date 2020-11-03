import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewNotificationModalPage } from './view-notification-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ViewNotificationModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewNotificationModalPageRoutingModule {}

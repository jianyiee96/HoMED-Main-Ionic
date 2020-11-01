import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewNotificationModalPageRoutingModule } from './view-notification-modal-routing.module';

import { ViewNotificationModalPage } from './view-notification-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewNotificationModalPageRoutingModule
  ],
  declarations: [ViewNotificationModalPage]
})
export class ViewNotificationModalPageModule {}

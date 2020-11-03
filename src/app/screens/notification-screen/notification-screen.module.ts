import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationScreenPageRoutingModule } from './notification-screen-routing.module';

import { NotificationScreenPage } from './notification-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationScreenPageRoutingModule
  ],
  declarations: [NotificationScreenPage]
})
export class NotificationScreenPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatusScreenPageRoutingModule } from './status-screen-routing.module';

import { StatusScreenPage } from './status-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatusScreenPageRoutingModule
  ],
  declarations: [StatusScreenPage]
})
export class StatusScreenPageModule {}

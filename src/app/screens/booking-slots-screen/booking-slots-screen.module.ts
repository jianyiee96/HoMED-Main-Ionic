import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingSlotsScreenPageRoutingModule } from './booking-slots-screen-routing.module';

import { BookingSlotsScreenPage } from './booking-slots-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingSlotsScreenPageRoutingModule
  ],
  declarations: [BookingSlotsScreenPage]
})
export class BookingSlotsScreenPageModule {}

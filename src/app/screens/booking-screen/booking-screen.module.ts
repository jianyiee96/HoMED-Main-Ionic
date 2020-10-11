import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingScreenPageRoutingModule } from './booking-screen-routing.module';

import { BookingScreenPage } from './booking-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingScreenPageRoutingModule
  ],
  declarations: [BookingScreenPage]
})
export class BookingScreenPageModule {}

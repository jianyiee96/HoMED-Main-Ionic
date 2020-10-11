import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingParamsScreenPageRoutingModule } from './booking-params-screen-routing.module';

import { BookingParamsScreenPage } from './booking-params-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingParamsScreenPageRoutingModule
  ],
  declarations: [BookingParamsScreenPage]
})
export class BookingParamsScreenPageModule {}

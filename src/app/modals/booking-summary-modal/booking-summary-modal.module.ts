import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingSummaryModalPageRoutingModule } from './booking-summary-modal-routing.module';

import { BookingSummaryModalPage } from './booking-summary-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingSummaryModalPageRoutingModule
  ],
  declarations: [BookingSummaryModalPage]
})
export class BookingSummaryModalPageModule {}

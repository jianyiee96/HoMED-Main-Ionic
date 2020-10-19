import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletedConsultationsScreenPageRoutingModule } from './completed-consultations-screen-routing.module';

import { CompletedConsultationsScreenPage } from './completed-consultations-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletedConsultationsScreenPageRoutingModule
  ],
  declarations: [CompletedConsultationsScreenPage]
})
export class CompletedConsultationsScreenPageModule {}

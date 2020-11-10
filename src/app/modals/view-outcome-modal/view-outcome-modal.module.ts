import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewOutcomeModalPageRoutingModule } from './view-outcome-modal-routing.module';

import { ViewOutcomeModalPage } from './view-outcome-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewOutcomeModalPageRoutingModule
  ],
  declarations: [ViewOutcomeModalPage]
})
export class ViewOutcomeModalPageModule {}

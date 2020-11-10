import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicalBoardScreenPageRoutingModule } from './medical-board-screen-routing.module';

import { MedicalBoardScreenPage } from './medical-board-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicalBoardScreenPageRoutingModule
  ],
  declarations: [MedicalBoardScreenPage]
})
export class MedicalBoardScreenPageModule {}

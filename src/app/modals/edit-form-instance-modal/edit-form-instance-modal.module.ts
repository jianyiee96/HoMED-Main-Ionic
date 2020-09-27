import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditFormInstanceModalPageRoutingModule } from './edit-form-instance-modal-routing.module';

import { EditFormInstanceModalPage } from './edit-form-instance-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditFormInstanceModalPageRoutingModule
  ],
  declarations: [EditFormInstanceModalPage]
})
export class EditFormInstanceModalPageModule {}

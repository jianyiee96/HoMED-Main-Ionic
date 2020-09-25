import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormRepositoryScreenPageRoutingModule } from './form-repository-screen-routing.module';

import { FormRepositoryScreenPage } from './form-repository-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormRepositoryScreenPageRoutingModule
  ],
  declarations: [FormRepositoryScreenPage]
})
export class FormRepositoryScreenPageModule {}

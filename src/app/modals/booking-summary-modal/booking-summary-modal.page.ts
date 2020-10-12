import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { Booking } from 'src/app/classes/booking/booking';
import { FormInstance } from 'src/app/classes/form-instance/form-instance';

@Component({
  selector: 'app-booking-summary-modal',
  templateUrl: './booking-summary-modal.page.html',
  styleUrls: ['./booking-summary-modal.page.scss'],
})
export class BookingSummaryModalPage implements OnInit {

  booking: Booking

  constructor(
    private modalController: ModalController,
    private navParam: NavParams,
    private router: Router
  ) {
    this.booking = navParam.get("booking")
  }

  ngOnInit() {
  }

  redirectToFormInstance(fi: FormInstance) {
    this.dismiss()
    this.router.navigate(['/form-screen/' + fi.formInstanceId])
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}

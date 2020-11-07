import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { Notification } from 'src/app/classes/notification/notification';
import { NotificationTypeEnum } from 'src/app/classes/notificationtype-enum';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-view-notification-modal',
  templateUrl: './view-notification-modal.page.html',
  styleUrls: ['./view-notification-modal.page.scss'],
})
export class ViewNotificationModalPage implements OnInit {

  notification: Notification

  constructor(
    private modalController: ModalController,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
  }

  redirect() {
    switch (this.notification.notificationTypeEnum) {
      case NotificationTypeEnum.FORM:
        this.dismissAndRedirectToForm(this.notification.dynamicId)
        break;
      case NotificationTypeEnum.BOOKING:
        this.dismissAndRedirectToBooking(this.notification.dynamicId)
        break;
      case NotificationTypeEnum.CONSULTATION:
        this.dismissAndRedirectToConsultation(this.notification.dynamicId)
        break;
      default:
        break;
    }
  }

  deleteNotification() {
    this.notificationService.deleteNotification(this.notification.notificationId).subscribe(
      response => {
        this.dismiss()
      },
      error => {
        console.log(error);
      }
    )
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  dismissAndRedirectToForm(formInstanceId: number) {
    this.modalController.dismiss({
      'dismissed': true,
      'formInstanceId': formInstanceId
    });
  }

  dismissAndRedirectToBooking(bookingId: number) {
    this.modalController.dismiss({
      'dismissed': true,
      'bookingId': bookingId
    });
  }

  dismissAndRedirectToConsultation(consultationId: number) {
    this.modalController.dismiss({
      'dismissed': true,
      'consultationId': consultationId
    });
  }

  convertUTCStringToSingaporeDate(dateCreated) {
    if (dateCreated != null) {
      let stringUtcTime = dateCreated.toLocaleString().substring(0, 19)
      return new Date(Date.UTC(
        parseInt(stringUtcTime.substring(0, 4)),
        parseInt("" + (+stringUtcTime.substring(5, 7) - 1)),
        parseInt(stringUtcTime.substring(8, 10)),
        parseInt(stringUtcTime.substring(11, 13)),
        parseInt(stringUtcTime.substring(14, 16)),
        parseInt(stringUtcTime.substring(17, 19))
      ));
    }
  }

}

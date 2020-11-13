import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Notification } from 'src/app/classes/notification/notification';
import { ViewNotificationModalPage } from 'src/app/modals/view-notification-modal/view-notification-modal.page';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-notification-screen',
  templateUrl: './notification-screen.page.html',
  styleUrls: ['./notification-screen.page.scss'],
})
export class NotificationScreenPage implements OnInit {

  isShown: boolean

  allNotifications: Notification[]
  todayNotifications: Notification[]
  thisWeekNotifications: Notification[]
  earlierNotifications: Notification[]

  constructor(
    private modalController: ModalController,
    private notificationService: NotificationService,
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.isShown = true
    this.retrieveAllServicemanNotifications()
  }

  doRefresh(event) {
    this.retrieveAllServicemanNotifications()
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  retrieveAllServicemanNotifications() {
    var n2
    var n3

    this.notificationService.retrieveAllServicemanNotifications().subscribe(
      response => {
        this.allNotifications = response.notifications

        this.allNotifications.forEach(n => {
          n.notificationDate = this.convertUTCStringToSingaporeDate(n.notificationDate)

          var nd = new Date(n.notificationDate);
          var day = nd.getDay(), diff = nd.getDate() - day + (day == 0 ? -6 : 1)
          var n1date = new Date(nd.setDate(diff))
          n2 = new Notification(2, n1date, `Booking Cancelled`, `Ships From. 1 sunview road Eco-tech Building, SG. Packaging Types: ... Se7en Baby Kids Cartoon Animal School Drinking Water Straw Bottle Sippy Cup ..`, true, true, n.serviceman)

          var nd = new Date(n.notificationDate);
          var day = nd.getDay(), diff = nd.getDate() - 15
          var n1date = new Date(nd.setDate(diff))
          n3 = new Notification(3, n1date, `Important News`, `Baby Kids Cartoon School Drinking Water Straw Bottle Sippy Suction Cup.
          `, false, true, n.serviceman)
        })

        // this.allNotifications.push(n2) // for testing thisWeek notifs
        // this.allNotifications.push(n3) // for testing earlier notifs

        this.allNotifications.sort((x, y) => (y.notificationDate.getTime() - x.notificationDate.getTime()))

        this.assignToNotificationArrays()
      },
      error => {
        console.log(error);
      }
    )
  }

  readNotification(notification: Notification) {
    this.notificationService.readNotification(notification.notificationId).subscribe(
      response => {
        this.presentNotificationModal(notification)
      },
      error => {
        console.log(error);
      }
    )
  }

  readAllNotifications() {
    this.notificationService.readAllNotifications().subscribe(
      response => {
        this.retrieveAllServicemanNotifications()
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteNotification(notificationId: number) {
    this.notificationService.deleteNotification(notificationId).subscribe(
      response => {
        this.retrieveAllServicemanNotifications()
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteAllNotifications() {
    this.notificationService.deleteAllNotifications().subscribe(
      response => {
        console.log(`deleted all`);
        this.retrieveAllServicemanNotifications()
      },
      error => {
        console.log(error);

      }
    )
  }

  assignToNotificationArrays() {
    this.todayNotifications = []
    this.thisWeekNotifications = []
    this.earlierNotifications = []

    this.allNotifications.forEach(n => {

      if (this.isDateToday(n.notificationDate)) {
        this.todayNotifications.push(n)
      } else if (this.isDateInThisWeek(n.notificationDate)) {
        this.thisWeekNotifications.push(n)
      } else {
        this.earlierNotifications.push(n)
      }

    })
  }

  isDateToday(date) {
    let currentDate = new Date()

    return date.getDate() === currentDate.getDate()
      && date.getMonth() === currentDate.getMonth()
      && date.getFullYear() === currentDate.getFullYear()
  }

  isDateInThisWeek(date) {
    var curr = new Date

    var firstday = this.getMonday(curr)
    firstday.setHours(0, 0, 0, 0)

    var lastDay = new Date(firstday)
    lastDay.setDate(lastDay.getDate() + 6)
    lastDay.setHours(23, 59, 59, 59)

    return date >= firstday && date <= lastDay;
  }

  getMonday(d) {
    d = new Date(d);
    var day = d.getDay(), diff = d.getDate() - day + (day == 0 ? -6 : 1)
    return new Date(d.setDate(diff))
  }

  async presentNotificationModal(notification: Notification) {
    const modal = await this.modalController.create({
      component: ViewNotificationModalPage,
      componentProps: {
        notification: notification
      }
    });

    modal.onDidDismiss().then((value) => {
      this.retrieveAllServicemanNotifications()
    })

    return await modal.present();
  }

  scrollHandler(event) {
    this.ngZone.run(() => {
      this.isShown = false
    })
  }

  scrollStop(event) {
    this.ngZone.run(() => {
      this.isShown = true
    })
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

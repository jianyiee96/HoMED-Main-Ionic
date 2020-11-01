import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SessionService } from './services/session/session.service';
import { Serviceman } from './classes/serviceman/serviceman';
import { TimerService } from './services/timer/timer.service';
import { FormService } from './services/form/form.service';
import { NotificationService } from './services/notification/notification.service';
import { Notification } from './classes/notification/notification';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public notificationCount

  public selectedIndex
  public appPages = [
    {
      title: 'Home',
      url: '/home-screen',
      icon: 'home'
    },
    {
      title: 'Booking',
      url: '/booking-screen',
      icon: 'calendar'
    },
    {
      title: 'Forms',
      url: '/form-screen',
      icon: 'pencil'
    },
    {
      title: 'Consultation',
      url: '/consultation-screen',
      icon: 'git-network'
    },
    {
      title: `Notification`,
      url: '/notification-screen',
      icon: 'mail'
    },
    {
      title: 'Account',
      url: '/account-screen',
      icon: 'person-circle'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private sessionService: SessionService,
    private formService: FormService,
    private timerService: TimerService,
    private notificationService: NotificationService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.timerService.startPrimaryTimer();

    const path = window.location.pathname;

    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  loadNotifications() {
    if (this.sessionService.getCurrentServiceman() != null) {
      this.notificationService.retrieveAllServicemanNotifications().subscribe(
        response => {
          this.notificationCount = 0
          let retrievedNotifications: Notification[] = response.notifications
          retrievedNotifications.forEach(n => {
            if (!n.isRead) {
              this.notificationCount++
            }
          })
          this.updateNotificationCount(this.notificationCount)
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  updateNotificationCount(notificationCount: number) {
    if (notificationCount > 1) {

      this.appPages[4].title = `${this.notificationCount} Notifications`
      this.appPages[4].icon = `mail-unread`

    } else if (notificationCount === 1) {

      this.appPages[4].title = `${this.notificationCount} Notification`
      this.appPages[4].icon = `mail-unread`

    } else if (notificationCount === 0) {

      this.appPages[4].title = `Notification`
      this.appPages[4].icon = `mail`

    }
  }

}

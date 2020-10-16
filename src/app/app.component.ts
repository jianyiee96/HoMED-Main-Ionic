import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SessionService } from './services/session/session.service';
import { Serviceman } from './classes/serviceman/serviceman';
import { TimerService } from './services/timer/timer.service';
import { FormService } from './services/form/form.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  private taskCount: number

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
      title: 'Inbox',
      url: '/userFunctions/inbox',
      icon: 'mail'
    },
    {
      title: 'Forms',
      url: '/form-screen',
      icon: 'pencil'
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
    private timerService: TimerService
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

  loadTasks() {

    this.formService.retrieveAllServicemanFormInstances(false).subscribe(
      response => {
        var allFormInstances = []
        this.taskCount = 0

        allFormInstances = response.formInstances

        allFormInstances.forEach(form => {
          if (form.formInstanceStatusEnum.toString() == "DRAFT") {
            this.taskCount++
          }
        })
      },
      error => {
        console.error(error)
      }
    )

  }

}

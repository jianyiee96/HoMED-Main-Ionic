import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SessionService } from './services/session/session.service';
import { Serviceman } from './classes/serviceman/serviceman';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public selectedIndex
  public appPages = [
    {
      title: 'Home',
      url: '/home-screen',
      icon: 'home'
    },
    {
      title: 'Appointment',
      url: '/userFunctions/appointment',
      icon: 'calendar'
    },
    {
      title: 'Inbox',
      url: '/userFunctions/userAnalytics',
      icon: 'mail'
    },
    {
      title: 'Forms',
      url: '/userFunctions/forms',
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
    private sessionService: SessionService
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
    const path = window.location.pathname;
    
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}

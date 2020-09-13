import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-account-screen',
  templateUrl: './account-screen.page.html',
  styleUrls: ['./account-screen.page.scss'],
})
export class AccountScreenPage implements OnInit {

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentServiceman(null);
    this.router.navigate(["/login-screen"]);
  }

}

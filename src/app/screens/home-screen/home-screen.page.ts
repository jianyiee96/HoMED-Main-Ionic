import { Component, OnInit } from '@angular/core';

import { Serviceman } from 'src/app/classes/serviceman/serviceman';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.page.html',
  styleUrls: ['./home-screen.page.scss'],
})
export class HomeScreenPage implements OnInit {

  serviceman: Serviceman

  constructor(
    private sessionService: SessionService
  ) {
   }

  ngOnInit() {
    this.serviceman = this.sessionService.getCurrentServiceman()
  }

}

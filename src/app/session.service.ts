import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})

export class SessionService {

  constructor(private platform: Platform) { }

  getRootPath(): string
	{
		console.log('this.platform.is("hybrid"): ' + this.platform.is('hybrid'));
		
		if(this.platform.is('hybrid'))
		{
			return "http://192.168.137.1:8080/HoMED-rws/Resources/";
		}
		else
		{
			return "/api/";
		}
  }

  getIsLogin() {
    return false;
  }
  
}

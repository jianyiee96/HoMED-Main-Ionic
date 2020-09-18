import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Serviceman } from 'src/app/classes/serviceman/serviceman';


@Injectable({
	providedIn: 'root'
})

export class SessionService {

	constructor(private platform: Platform) { }

	getRootPath(): string {
		console.log('this.platform.is("hybrid"): ' + this.platform.is('hybrid'));

		return "/api/";

		// if (this.platform.is('hybrid')) {
		// 	return "http://192.168.1.4:8080/HoMED-rws/Resources/";
		// }
		// else {
		// 	return "/api/";
		// }
	}

	getIsLogin(): boolean {
		if (sessionStorage.isLogin == "true") {
			return true;
		}
		else {
			return false;
		}
	}

	setIsLogin(isLogin: boolean): void {
		sessionStorage.isLogin = isLogin;
	}

	getCurrentServiceman(): Serviceman {
		return JSON.parse(sessionStorage.currentServiceman);
	}

	setCurrentServiceman(currentServiceman: Serviceman): void {
		sessionStorage.currentServiceman = JSON.stringify(currentServiceman);
	}

	getNric(): string {
		return sessionStorage.nric;
	}

	setNric(nric: string): void {
		sessionStorage.nric = nric;
	}

	getPassword(): string {
		return sessionStorage.password;
	}

	setPassword(password: string): void {
		sessionStorage.password = password;
	}

}

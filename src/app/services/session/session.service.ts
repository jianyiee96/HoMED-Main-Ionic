import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Serviceman } from 'src/app/classes/serviceman/serviceman';


@Injectable({
	providedIn: 'root'
})
export class SessionService {
	constructor(private platform: Platform) { }

	getRootPath(): string {

		// for mobile phone deployment
		return "/api/"

		// if (this.platform.is('hybrid')) {
		// 	return "http://172.25.104.239:8080/HoMED-rws/Resources/"
		// }
		// else {
		// 	return "/api/"
		// }

	}

	getIsLogin(): boolean {
		if (sessionStorage.isLogin == "true") {
			return true
		}
		else {
			return false
		}
	}

	setIsLogin(isLogin: boolean): void {
		sessionStorage.isLogin = isLogin
	}

	getCurrentServiceman(): Serviceman {
		try {
			return JSON.parse(sessionStorage.currentServiceman)
		} catch (error) {
			return
		}
	}

	setCurrentServiceman(currentServiceman: Serviceman): void {
		sessionStorage.currentServiceman = JSON.stringify(currentServiceman)
	}

	getEmail(): string {
		return sessionStorage.email
	}

	setEmail(email: string): void {
		sessionStorage.email = email
	}

	getPassword(): string {
		return sessionStorage.password
	}

	setPassword(password: string): void {
		sessionStorage.password = password
	}

	getSecuredHttpOptions() {
		return {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Id': this.getCurrentServiceman().servicemanId.toString(),
					'Token': sessionStorage.token
				}
			)
		}
	}

	getSecuredHttpOptionsWithInterceptorHeader() {
		return {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Id': this.getCurrentServiceman().servicemanId.toString(),
					'Token': sessionStorage.token,
					'Interceptor' : 'false'
				}
			)
		}
	}

	setToken(token: string): void {
		sessionStorage.token = token
	}
}

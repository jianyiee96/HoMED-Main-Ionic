import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Serviceman } from 'src/app/classes/serviceman/serviceman';

import { SessionService } from '../session/session.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ServicemanService {

  baseUrl: string

  constructor(private httpClient: HttpClient, private sessionService: SessionService) {
    this.baseUrl = this.sessionService.getRootPath() + 'Serviceman'
  }

  login(email: string, password: string): Observable<any> {
    let loginReq = {
      "email": email,
      "password": password
    }

    return this.httpClient.post<any>(this.baseUrl + "/login", loginReq, httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  activateAccount(email: string, newPassword: string, confirmNewPassword: string) {
    let activateAccountReq = {
      "email": email,
      "newPassword": newPassword,
      "confirmNewPassword": confirmNewPassword
    }
    return this.httpClient.post<any>(this.baseUrl + "/activateAccount", activateAccountReq, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  changePassword(email: string, oldPassword: string, newPassword: string, confirmNewPassword: string) {
    let changePasswordReq = {
      "email": email,
      "oldPassword": oldPassword,
      "newPassword": newPassword,
      "confirmNewPassword": confirmNewPassword
    }

    return this.httpClient.post<any>(this.baseUrl + "/changePassword", changePasswordReq, this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  resetPassword(email: string, phoneNumber: string) {
    let resetPasswordReq = {
      "email": email,
      "phoneNumber": phoneNumber
    }

    return this.httpClient.post<any>(this.baseUrl + "/resetPassword", resetPasswordReq, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateAccount(accountToUpdate: Serviceman): Observable<any> {
    let updateAccountReq = {
      "serviceman": accountToUpdate
    }

    return this.httpClient.post<any>(this.baseUrl + "/updateServiceman", updateAccountReq, this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  retrieveServicemanDetails(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveServicemanDetails?servicemanId=" + this.sessionService.getCurrentServiceman().servicemanId, this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  assignFcmToken(fcmToken: string) {
    let assignFcmTokenReq = {
      "servicemanId": this.sessionService.getCurrentServiceman().servicemanId,
      "fcmToken": fcmToken
    }

    return this.httpClient.post<any>(this.baseUrl + "/assignFcmToken", assignFcmTokenReq, this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  unassignFcmToken() {
    let unassignFcmTokenReq = {
      "servicemanId": this.sessionService.getCurrentServiceman().servicemanId,
    }

    return this.httpClient.post<any>(this.baseUrl + "/assignFcmToken", unassignFcmTokenReq, this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = "";

    if (error.error instanceof ErrorEvent) {
      errorMessage = "An unknown error has occurred: " + error.error.message;
    }
    else {
      errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error.message}`;
    }

    console.error(errorMessage);

    return throwError(errorMessage);
  }

}

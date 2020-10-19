import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Consultation } from 'src/app/classes/consultation/consultation';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  baseUrl: string

  selectedConsultationPurposeId: number
  selectedConsultationPurposeName: string

  waitingConsultation: Consultation[]
  ongoingConsultation: Consultation[]
  completedConsultation: Consultation[]

  constructor(private httpClient: HttpClient, private sessionService: SessionService) {
    this.baseUrl = this.sessionService.getRootPath() + 'Consultation'
  }

  retrieveAllConsultationPurposes() {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveAllConsultationPurposes", this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  retrieveConsultationQueuePosition(consulationId: number) {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveConsultationQueuePosition?consultationId=" + consulationId, this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  retrieveServicemanConsultations() {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveServicemanConsultations?servicemanId=" + this.sessionService.getCurrentServiceman().servicemanId, this.sessionService.getSecuredHttpOptions()).pipe(
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

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BookingSlot } from 'src/app/classes/slot/slot';

import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  baseUrl: string

  selectedDate: Date
  bookingSlots: BookingSlot[]

  constructor(private httpClient: HttpClient, private sessionService: SessionService) {
    this.baseUrl = this.sessionService.getRootPath() + 'Scheduler'
  }

  queryBookingSlots(medicalCentreId: number, queryDate: Date) {
    let queryBookingSlotsReq = {
      "medicalCentreId": medicalCentreId,
      "queryDate": queryDate
    }

    return this.httpClient.post<any>(this.baseUrl + "/queryBookingSlots", queryBookingSlotsReq, this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    )
  }

  scheduleBooking(consultationPurposeId: number, bookingSlotId: number) {
    let scheduleBookingReq = {
      "servicemanId": this.sessionService.getCurrentServiceman().servicemanId,
      "consultationPurposeId": consultationPurposeId,
      "bookingSlotId": bookingSlotId
    }

    return this.httpClient.post<any>(this.baseUrl + "/scheduleBooking", scheduleBookingReq, this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    )
  }

  retrieveAllServicemanBookings() {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveAllServicemanBookings?servicemanId=" + this.sessionService.getCurrentServiceman().servicemanId, this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  cancelBooking(bookingId: number) {
    let cancelBookingReq = {
      "bookingId": bookingId
    }

    return this.httpClient.post<any>(this.baseUrl + "/cancelBooking", cancelBookingReq, this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    )
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

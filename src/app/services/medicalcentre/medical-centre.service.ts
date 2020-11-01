import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MedicalCentre } from 'src/app/classes/medical-centre/medical-centre';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class MedicalCentreService {

  baseUrl: string

  selectedMedicalCentre: MedicalCentre

  constructor(private httpClient: HttpClient, private sessionService: SessionService) {
    this.baseUrl = this.sessionService.getRootPath() + 'MedicalCentre'
  }

  retrieveAllMedicalCentres() {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveAllMedicalCentres", this.sessionService.getSecuredHttpOptions()).pipe(
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

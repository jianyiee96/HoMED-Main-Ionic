import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from '../session/session.service';
import { FormTemplate } from 'src/app/classes/form-template/form-template';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FormService {

  baseUrl: string

  formTemplates: FormTemplate[]

  constructor(private httpClient: HttpClient, private sessionService: SessionService) {
    this.baseUrl = this.sessionService.getRootPath() + 'Form'
  }

  createFormInstance(formTemplateId: number): Observable<any> {
    let createFormInstanceReq = {
      "servicemanId": this.sessionService.getCurrentServiceman().servicemanId,
      "formTemplateId": formTemplateId
    }

    return this.httpClient.post<any>(this.baseUrl + "/createFormInstance", createFormInstanceReq, httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  retrieveAllFormTemplates(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveAllFormTemplates").pipe(
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

import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(public loadingController: LoadingController) { }

    isLoading = false

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.startLoading()

        return next.handle(request).pipe(

            map((event: HttpEvent<any>) => {
                // if (event instanceof HttpResponse) {
                //     console.log('event returned to interceptot--->>>', event)
                // }

                this.isLoading = false
                return event
            }),
            catchError((error: HttpErrorResponse) => {
                console.error('error returned to interceptor--->>>', error)

                this.isLoading = false
                return throwError(error)
            })

        );

    }

    async startLoading() {
        this.isLoading = true;
        return await this.loadingController.create({
            message: "loading",
            mode: "ios",
            showBackdrop: false
        }).then(loadingElement => {
            loadingElement.present().then(() => {
                if (!this.isLoading) {
                    loadingElement.dismiss().then()
                }
            });
        });
    }

    // async dismissLoading() {
    //     this.isLoading = false;
    //     // return await this.loadingController.dismiss().then(() => console.log('dismissed'));
    // }

}

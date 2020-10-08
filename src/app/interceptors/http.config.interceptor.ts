import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { TimerService } from '../services/timer/timer.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(
        public loadingController: LoadingController,
        private alertController: AlertController,
        private timerService: TimerService
    ) { }

    isLoading = false

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.startLoading()

        return next.handle(request).pipe(

            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('event returned to interceptor--->>>', event)
                    this.dismissLoading()
                }

                return event
            }),
            catchError((error: HttpErrorResponse) => {
                console.error('error returned to interceptor--->>>', error)
                this.dismissLoading()

                if (error.error.message.toLowerCase().includes("json")) {
                    this.presentLogoutAlert()
                }

                return throwError(error)
            })

        )

    }

    async startLoading() {
        this.isLoading = true
        return await this.loadingController.create({
            message: "loading",
            mode: "ios",
            showBackdrop: false
        }).then(loadingElement => {
            loadingElement.present().then(() => {
                if (!this.isLoading) {
                    loadingElement.dismiss().then()
                }
            })
        })
    }

    async dismissLoading() {
        this.isLoading = false
        return await this.loadingController.dismiss().then(() => { })
    }

    async presentLogoutAlert() {
        const alert = await this.alertController.create({
            header: 'Invalid JSON Token',
            subHeader: 'For security reasons, you will have to re-login.',
            backdropDismiss: false,
            cssClass: 'activateAccountAlert',
            buttons: [
                {
                    text: 'Logout',
                    cssClass: 'activate-button',
                    handler: () => {
                        this.timerService.logoutUser()
                    }
                }
            ]
        });

        await alert.present();
    }

}

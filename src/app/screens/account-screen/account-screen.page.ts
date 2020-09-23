import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertController, ModalController, ToastController } from '@ionic/angular';

import { Serviceman } from 'src/app/classes/serviceman/serviceman';
import { ServicemanService } from 'src/app/services/serviceman/serviceman.service';
import { SessionService } from 'src/app/services/session/session.service';
import { TimerService } from 'src/app/services/timer/timer.service';

@Component({
  selector: 'app-account-screen',
  templateUrl: './account-screen.page.html',
  styleUrls: ['./account-screen.page.scss'],
})
export class AccountScreenPage implements OnInit {

  serviceman: Serviceman
  name: string
  password: string
  phoneNumber: string
  rod: Date
  email: string
  streetName: string
  unitNumber: string
  buildingName: string
  postal: string

  isEditing: boolean
  fieldsUpdated: boolean

  passwordError: boolean
  phoneNumberError: boolean
  streetNameError: boolean
  postalError: boolean

  passwordErrorMessage: string
  phoneNumberErrorMessage: string
  streetNameErrorMessage: string
  postalErrorMessage: string

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private servicemanService: ServicemanService,
    private timerService: TimerService,
    private alertController: AlertController,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.isEditing = false
    this.fieldsUpdated = false

    this.phoneNumberError = false
    this.passwordError = false
    this.streetNameError = false
    this.postalError = false

    this.serviceman = this.sessionService.getCurrentServiceman()
    this.name = this.serviceman.name
    this.phoneNumber = this.serviceman.phoneNumber
    this.rod = this.parseDate(this.serviceman.rod).substring(0, 10)
    this.email = this.serviceman.email
    this.streetName = this.serviceman.address.streetName
    this.unitNumber = this.serviceman.address.unitNumber
    this.buildingName = this.serviceman.address.buildingName
    this.postal = this.serviceman.address.postal
  }

  async changePasswordPrompt() {

    this.clearErrors()

    const alert = await this.alertController.create({
      header: 'Change Password',
      subHeader: 'Avoid passwords that are used elsewhere.',
      cssClass: 'activateAccountAlert',
      inputs: [
        {
          name: 'currentPassword',
          type: 'password',
          placeholder: 'Current Password'
        },
        {
          name: 'newPassword',
          type: 'password',
          placeholder: 'New Password'
        },
        {
          name: 'confirmNewPassword',
          type: 'password',
          placeholder: 'Confirm New Password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel-button',
          handler: () => { }
        },
        {
          text: 'Change',
          cssClass: 'activate-button',
          handler: data => {
            if (data.newPassword != data.confirmNewPassword) {
              this.updateAlertMessage("The two given passwords do not match.", alert);
              return false;
            } else if (data.newPassword.length < 8) {
              this.updateAlertMessage("New password must be at least 8 characters.", alert);
              return false;
            } else if (data.currentPassword == data.newPassword) {
              this.updateAlertMessage("New password cannot be same as current password.", alert);
              return false;
            } else {
              this.changePassword(this.email, data.currentPassword, data.newPassword, data.confirmNewPassword)
            }
          }
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }

  updateAlertMessage(message: string, alert: HTMLIonAlertElement) {
    alert.message = message
  }

  changePassword(email: string, oldPassword: string, newPassword: string, confirmNewPassword: string) {
    this.servicemanService.changePassword(email, oldPassword, newPassword, confirmNewPassword).subscribe(
      response => {
        this.presentPassedToast("Password changed successfully.");
      }, error => {
        this.passwordErrorMessage = error.substring(37)
        this.passwordError = true
      }
    );
  }

  editForm() {
    this.isEditing = !this.isEditing
    this.clearErrors()
    this.fieldsUpdated = false

    // when user taps 'Cancel' after tapping 'Edit Account Details'
    this.phoneNumber = this.serviceman.phoneNumber
    this.streetName = this.serviceman.address.streetName
    this.unitNumber = this.serviceman.address.unitNumber
    this.buildingName = this.serviceman.address.buildingName
    this.postal = this.serviceman.address.postal
  }

  fieldChange() {
    this.fieldsUpdated = true
  }

  update(updateForm: NgForm) {

    this.clearErrors()

    if (updateForm.valid) {

      this.serviceman.phoneNumber = this.phoneNumber
      this.serviceman.address.streetName = this.streetName
      this.serviceman.address.unitNumber = this.unitNumber
      this.serviceman.address.buildingName = this.buildingName
      this.serviceman.address.postal = this.postal

      this.servicemanService.updateAccount(this.serviceman).subscribe(
        response => {
          this.presentPassedToast("Account updated successfully");
          this.serviceman = response.serviceman
          this.sessionService.setCurrentServiceman(this.serviceman)
          this.editForm()
        },
        error => {
          this.serviceman = this.sessionService.getCurrentServiceman()

          if (error.toLowerCase().includes("phone number")) {
            this.phoneNumberErrorMessage = error.substring(37)
            this.phoneNumberError = true
          }
          if (error.toLowerCase().includes("street name")) {
            this.streetNameErrorMessage = error.substring(37)
            this.streetNameError = true
          }
          if (error.toLowerCase().includes("postal")) {
            this.postalErrorMessage = error.substring(37)
            this.postalError = true
          }
        }
      )

      this.fieldsUpdated = false
    }

  }

  clearErrors() {
    this.passwordError = false
    this.phoneNumberError = false
    this.streetNameError = false
    this.postalError = false
  }

  async presentPassedToast(messageToDisplay: string) {
    const toast = await this.toastController.create({
      message: messageToDisplay,
      duration: 2000,
      color: "medium",
      position: "middle"
    });
    toast.present();
  }

  logout() {
    this.timerService.stopAllTimer()
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentServiceman(null);
    this.router.navigate(["/login-screen"]);
  }

  parseDate(date: any) {
    return date.toString().replace('[UTC]', '');
  }

}

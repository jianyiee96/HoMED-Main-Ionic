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
  nric: string
  phoneNumber: string
  rod: Date
  email: string
  address: string

  isEditing: boolean
  fieldsUpdated: boolean

  phoneNumberError: boolean
  emailError: boolean
  passwordError: boolean

  passwordErrorMessage: string

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
    this.emailError = false
    this.passwordError = false

    this.serviceman = this.sessionService.getCurrentServiceman()
    this.name = this.serviceman.name
    this.nric = this.serviceman.nric
    this.phoneNumber = this.serviceman.phoneNumber
    this.rod = this.parseDate(this.serviceman.rod).substring(0, 10)
    this.email = this.serviceman.email
    this.address = this.serviceman.address
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
              this.changePassword(this.nric, data.currentPassword, data.newPassword, data.confirmNewPassword)
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

  changePassword(nric: string, oldPassword: string, newPassword: string, confirmNewPassword: string) {
    this.servicemanService.changePassword(nric, oldPassword, newPassword, confirmNewPassword).subscribe(
      response => {
        this.presentPassedToast("Password changed successfully.");
      }, error => {
        this.passwordError = true
        if (error.includes("password do not match password associated with account")) {
          this.passwordErrorMessage = "Wrong current password entered."
        } else {
          this.passwordErrorMessage = "Unable to change password."
        }
      }
    );
  }

  editForm() {
    this.isEditing = !this.isEditing
    this.clearErrors()
    this.fieldsUpdated = false

    this.phoneNumber = this.serviceman.phoneNumber
    this.email = this.serviceman.email
    this.address = this.serviceman.address
  }

  fieldChange() {
    this.fieldsUpdated = true
  }

  update(updateForm: NgForm) {

    this.clearErrors()

    if (updateForm.valid) {

      this.serviceman.phoneNumber = this.phoneNumber
      this.serviceman.email = this.email
      this.serviceman.address = this.address

      this.servicemanService.updateAccount(this.serviceman).subscribe(
        response => {
          this.presentPassedToast("Account updated successfully");
          this.serviceman = response.serviceman
          this.sessionService.setCurrentServiceman(this.serviceman)
          this.editForm()
        },
        error => {
          this.serviceman = this.sessionService.getCurrentServiceman()
          if (error.includes("EMAIL")) {
            this.emailError = true
          }
          if (error.includes("PHONENUMBER")) {
            this.phoneNumberError = true
          }
        }
      )

      this.fieldsUpdated = false
    }

  }

  clearErrors() {
    this.phoneNumberError = false
    this.emailError = false
    this.passwordError = false
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

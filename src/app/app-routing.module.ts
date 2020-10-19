import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start-screen',
    pathMatch: 'full'
  },
  {
    path: 'start-screen',
    loadChildren: () => import('./screens/start-screen/start-screen.module').then(m => m.StartScreenPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login-screen',
    loadChildren: () => import('./screens/login-screen/login-screen.module').then(m => m.LoginScreenPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home-screen',
    loadChildren: () => import('./screens/home-screen/home-screen.module').then(m => m.HomeScreenPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'account-screen',
    loadChildren: () => import('./screens/account-screen/account-screen.module').then(m => m.AccountScreenPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'form-screen',
    loadChildren: () => import('./screens/form-screen/form-screen.module').then(m => m.FormScreenPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'form-screen/:formInstanceId',
    loadChildren: () => import('./screens/form-screen/form-screen.module').then(m => m.FormScreenPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'form-repository-screen',
    loadChildren: () => import('./screens/form-repository-screen/form-repository-screen.module').then(m => m.FormRepositoryScreenPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'view-form-template-modal',
    loadChildren: () => import('./modals/view-form-template-modal/view-form-template-modal.module').then(m => m.ViewFormTemplateModalPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-form-instance-modal',
    loadChildren: () => import('./modals/edit-form-instance-modal/edit-form-instance-modal.module').then(m => m.EditFormInstanceModalPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'view-submitted-form-modal',
    loadChildren: () => import('./modals/view-submitted-form-modal/view-submitted-form-modal.module').then(m => m.ViewSubmittedFormModalPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'booking-screen',
    loadChildren: () => import('./screens/booking-screen/booking-screen.module').then(m => m.BookingScreenPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'booking-screen/:slotId',
    loadChildren: () => import('./screens/booking-screen/booking-screen.module').then(m => m.BookingScreenPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'booking-params-screen',
    loadChildren: () => import('./screens/booking-params-screen/booking-params-screen.module').then(m => m.BookingParamsScreenPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'booking-slots-screen',
    loadChildren: () => import('./screens/booking-slots-screen/booking-slots-screen.module').then(m => m.BookingSlotsScreenPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'booking-summary-modal',
    loadChildren: () => import('./modals/booking-summary-modal/booking-summary-modal.module').then(m => m.BookingSummaryModalPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'consultation-screen',
    loadChildren: () => import('./screens/consultation-screen/consultation-screen.module').then(m => m.ConsultationScreenPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'waiting-consultations-screen',
    loadChildren: () => import('./screens/waiting-consultations-screen/waiting-consultations-screen.module').then(m => m.WaitingConsultationsScreenPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'completed-consultations-screen',
    loadChildren: () => import('./screens/completed-consultations-screen/completed-consultations-screen.module').then(m => m.CompletedConsultationsScreenPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

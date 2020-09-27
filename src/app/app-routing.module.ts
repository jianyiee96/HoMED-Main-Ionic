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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
    loadChildren: () => import('./screens/start-screen/start-screen.module').then(m => m.StartScreenPageModule)
  },
  {
    path: 'login-screen',
    loadChildren: () => import('./screens/login-screen/login-screen.module').then(m => m.LoginScreenPageModule)
  },
  {
    path: 'home-screen',
    loadChildren: () => import('./screens/home-screen/home-screen.module').then( m => m.HomeScreenPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'account-screen',
    loadChildren: () => import('./screens/account-screen/account-screen.module').then( m => m.AccountScreenPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

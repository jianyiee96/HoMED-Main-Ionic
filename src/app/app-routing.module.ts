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
    loadChildren: () => import('./start-screen/start-screen.module').then(m => m.StartScreenPageModule)
  },
  {
    path: 'login-screen',
    loadChildren: () => import('./login-screen/login-screen.module').then(m => m.LoginScreenPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

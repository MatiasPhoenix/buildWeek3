import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Pages/auth/auth.guard';

const routes: Routes = [
  {
    path        : '',
    redirectTo  : '/auth',
    pathMatch   : 'full'
  },
  {
    path: 'auth', loadChildren: () => import('./Pages/auth/auth.module').then(m => m.AuthModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'dashboard', loadChildren: () => import('./Pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user-page', loadChildren: () => import('./Pages/user-page/user-page.module').then(m => m.UserPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

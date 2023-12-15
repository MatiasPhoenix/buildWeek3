import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Pages/auth/auth.guard';
import { TutorialsComponent } from './Pages/tutorials/tutorials.component';

const routes: Routes = [
  {
    path        : '',
    redirectTo  : '/auth',
    pathMatch   : 'full'
  },
  {
    path: 'auth', loadChildren: () => import('./Pages/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard', loadChildren: () => import('./Pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user-page', loadChildren: () => import('./Pages/user-page/user-page.module').then(m => m.UserPageModule)
  },
  {
    path: 'tutorials',
    component: TutorialsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

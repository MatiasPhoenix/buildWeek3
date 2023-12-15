import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TitleComponent } from './title/title.component';
import { TutorialsComponent } from '../tutorials/tutorials.component';

const routes: Routes = [
  {
    path      : '',
    component : DashboardComponent,
  },
  {
    path      : 'title/:id',
    component : TitleComponent,
  },
  {
    path: 'tutorials',
    component: TutorialsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

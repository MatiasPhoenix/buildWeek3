import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPageComponent } from './user-page.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  {
    path      : '',
    component : UserPageComponent
  },
  {
    path      : 'favorites',
    component : FavoritesComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPageRoutingModule { }

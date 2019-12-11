import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { HomeComponent } from './home/home.component';
import { VehiclesEditComponent } from './vehicles/vehicles-edit/vehicles-edit.component';
import { VehiclesResolverService } from './shared/vehicles-resolver.service';
import { VehiclesDetailComponent } from './vehicles/vehicles-detail/vehicles-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'vehicles',
    component: VehiclesComponent,
    children : [
      {path: ':id', component: VehiclesDetailComponent}
    ]
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

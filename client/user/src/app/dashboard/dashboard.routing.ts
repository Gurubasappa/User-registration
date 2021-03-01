import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Layouts
import { DashboardComponent } from './dashboard';
import { CommonLayoutComponent } from '../layout/layout';


export const routes: Routes = [
 
  {
    path: '',
    component: CommonLayoutComponent,
    data: {
      title: 'dashboard'
    },
    children: [
      { path: '', component: DashboardComponent },
    ]
  },
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export  class DashboardRoutingModule {}

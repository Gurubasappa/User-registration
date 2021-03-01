import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Layouts
import { RegisterComponent } from './register';
import { CommonLayoutComponent } from '../layout/layout';


export const routes: Routes = [
 
  {
    path: '',
    component: CommonLayoutComponent,
    data: {
      title: 'register'
    },
    children: [
      { path: '', component: RegisterComponent },
    ]
  },
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export  class DashboardRoutingModule {}

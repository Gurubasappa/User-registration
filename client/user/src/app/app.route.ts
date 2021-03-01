import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Layouts
import { CommonLayoutComponent } from './layout/layout';
import { RegisterComponent } from './register/register';
import { DashboardComponent } from './dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: CommonLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
 
       //  loadChildren: () => import(`./dashboards/dashboards.module`).then(m => m.DashboardsModule) ,
      }
    ]
  }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

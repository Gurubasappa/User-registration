import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonLayoutComponent } from './layout/layout';
import { AppRoutingModule } from './app.route';
import { RegisterComponent } from './register/register';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard';

import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    CommonLayoutComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

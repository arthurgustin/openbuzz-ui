import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {ProspectService} from './table/services/prospect/prospect.service';
import {NgModule} from '@angular/core';
import {ProspectListComponent} from './table/components/prospect-list/prospect-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AppMaterialModule} from './app-material.module';

@NgModule({
  declarations: [
    AppComponent,
    ProspectListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppMaterialModule
  ],
  providers: [ProspectService],
  bootstrap: [AppComponent]
})
export class AppModule { }

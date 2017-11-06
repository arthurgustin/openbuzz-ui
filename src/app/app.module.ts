import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { AppComponent } from './app.component';
import {ProspectService} from './table/services/prospect/prospect.service';
import {NgModule} from '@angular/core';
import {ProspectListComponent} from './table/components/prospect-list/prospect-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AppMaterialModule} from './app-material.module';
import {ButtonAddComponent, ButtonAddDialogComponent} from './table/components/prospect-add/button-add.component';
import {Autosize} from 'ng-autosize';
import {CrawlStateService} from './table/services/prospect/state-changed.service';

@NgModule({
  declarations: [
    AppComponent,
    ProspectListComponent,
    ButtonAddComponent,
    ButtonAddDialogComponent,
    Autosize,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppMaterialModule,
    TextareaAutosizeModule
  ],
  entryComponents: [
    ButtonAddDialogComponent
  ],
  providers: [ProspectService, CrawlStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }

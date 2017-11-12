import { CommonModule } from '@angular/common';
import { DialogComponent } from './components/dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {AppMaterialModule} from '../app-material.module';

const COMPONENTS = [
  DialogComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppMaterialModule
  ],
  declarations: [
    COMPONENTS
  ],
  entryComponents: [
    DialogComponent
  ],
  exports: [
    COMPONENTS,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
        ngModule : SharedModule,
        providers : []
    };
  }
}

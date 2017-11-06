import { CdkTableModule } from '@angular/cdk/table';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatTooltipModule,
  MatChipsModule,
    } from '@angular/material';
import { NgModule } from '@angular/core';

const MODULES = [MatDialogModule, MatInputModule, MatCardModule, MatCheckboxModule, MatChipsModule,
    MatButtonModule, MatTabsModule, MatIconModule, MatTableModule, MatPaginatorModule, MatSelectModule, MatSlideToggleModule,
    MatProgressBarModule, MatSnackBarModule, MatFormFieldModule, MatTooltipModule, CdkTableModule];

@NgModule({
    imports: MODULES,
    exports: MODULES
})
export class AppMaterialModule { }

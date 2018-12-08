import { NgModule } from '@angular/core';
import {
    MatButtonModule, MatCardModule,
    MatChipsModule, MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatMenuModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule, MatSidenavModule, MatSnackBarModule,
    MatSortModule, MatTableModule,
    MatTabsModule, MatToolbarModule
} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

@NgModule({
  exports: [
      // Material moment date module
      MatMomentDateModule,

      // Material
      MatButtonModule,
      MatIconModule,
      MatCheckboxModule,
      MatChipsModule,
      MatFormFieldModule,
      MatInputModule,
      MatPaginatorModule,
      MatRippleModule,
      MatSelectModule,
      MatSortModule,
      MatSnackBarModule,
      MatTableModule,
      MatTabsModule,
      MatCardModule,
      MatMenuModule,
      MatToolbarModule,
      MatSidenavModule,
  ]
})
export class MatCoreModule { }

import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';

const MaterialComponents = [
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatGridListModule,
    MatListModule,
    MatDialogModule,
    MatTableModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatIconModule,
    MatBadgeModule
]
@NgModule({
    imports: [MaterialComponents],
    exports: [MaterialComponents]
  })
  export class MaterialModule { }
  
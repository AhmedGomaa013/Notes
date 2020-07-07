import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '../shared/shared.module';

import { OpenDialogComponent } from './dialog/open-dialog.component';
import { NotesComponent } from './notes/notes.component';


@NgModule({
  declarations: [OpenDialogComponent,
  NotesComponent],
  imports: [
    RouterModule.forChild([
      { path: ':user', component: NotesComponent },
      { path: 'dialog', component: OpenDialogComponent },
    ]),
    MatDialogModule,
    SharedModule
  ],
  providers:[]
})
export class NotesModule { }

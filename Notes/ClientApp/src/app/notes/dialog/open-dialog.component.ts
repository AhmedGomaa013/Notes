import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: 'open-dialog-component',
  templateUrl: './open-dialog.component.html'
})

export class OpenDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<OpenDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) { }

  onNoClick(): void {
    this.dialogRef.close(0);
  }

  onYesClick(): void {
    this.dialogRef.close(1);
  }

}

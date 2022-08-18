import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-condiciones',
  templateUrl: './condiciones.component.html',
  styleUrls: ['./condiciones.component.scss']
})
export class CondicionesComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CondicionesComponent>, 
  ) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}

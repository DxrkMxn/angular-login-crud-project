import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.css']
})
export class ModalConfirmacionComponent {
  constructor(private dialogRef: MatDialogRef<ModalConfirmacionComponent>) { }

  confirmar() {
    this.dialogRef.close(true); // Puedes enviar cualquier valor como resultado
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}

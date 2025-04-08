import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from "@angular/material/radio";
import { DrillingUnit } from "../../../../../../shared/models/entities/directories/drillingUnit.model";

@Component({
  selector: 'app-drilling-unit-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule
  ],
  templateUrl: './drilling-unit-modal.component.html',
  styleUrl: './drilling-unit-modal.component.css'
})
export class DrillingUnitModalComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DrillingUnitModalComponent>,
    @Inject(MAT_DIALOG_DATA) public drillingUnit: DrillingUnit
  ) {
    this.form = this.fb.group({
      name: [drillingUnit.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      inventoryNumber: [drillingUnit.inventoryNumber, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      isActive: [drillingUnit.isActive, Validators.required]
    });
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

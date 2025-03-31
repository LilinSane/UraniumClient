import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DrillingType } from "../../../../../../shared/models/entities/drillingType.model";

@Component({
  selector: 'app-drilling-type-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './drilling-type-modal.component.html',
  styleUrls: ['./drilling-type-modal.component.css']
})
export class DrillingTypeModalComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<DrillingTypeModalComponent>,
              @Inject(MAT_DIALOG_DATA) public drillingType: DrillingType) {
    this.form = this.fb.group({
      name: [drillingType.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]]
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

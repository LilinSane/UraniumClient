import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {DrillHoleType} from "../../../../../../shared/models/entities/directories/drillHoleType.model";

@Component({
  selector: 'app-drill-hole-type-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './drill-hole-type-modal.component.html',
  styleUrl: './drill-hole-type-modal.component.css'
})
export class DrillHoleTypeModalComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<DrillHoleTypeModalComponent>,
              @Inject(MAT_DIALOG_DATA) public drillHoleType: DrillHoleType) {
    this.form = this.fb.group({
      name: [drillHoleType.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]]
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

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { WorkDirection } from '../../../../../../shared/models/entities/directories/workDirection.model';

@Component({
  selector: 'app-work-direction-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './work-direction-modal.component.html',
  styleUrl: './work-direction-modal.component.css'
})
export class WorkDirectionModalComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<WorkDirectionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public workDirection: WorkDirection
  ) {
    this.form = this.fb.group({
      name: [workDirection.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]]
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

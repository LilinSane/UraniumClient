import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from "@angular/material/radio";
import {Customer} from "../../../../../../shared/models/entities/customer.model";

@Component({
  selector: 'app-customer-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule
  ],
  templateUrl: './customer-modal.component.html',
  styleUrl: './customer-modal.component.css'
})
export class CustomerModalComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<CustomerModalComponent>,
              @Inject(MAT_DIALOG_DATA) public customer: Customer) {
    this.form = this.fb.group({
      name: [customer.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      isActive: [customer.isActive, Validators.required]
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

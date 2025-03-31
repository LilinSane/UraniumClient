import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { WorkSubType } from "../../../../../../shared/models/entities/workSubType.model";
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from "@angular/material/autocomplete";
import { map, Observable, startWith } from "rxjs";
import {WorkType} from "../../../../../../shared/models/entities/workType.model";

@Component({
  selector: 'app-work-sub-type-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatOption
  ],
  templateUrl: './work-sub-type-modal.component.html',
  styleUrls: ['./work-sub-type-modal.component.css']
})
export class WorkSubTypeModalComponent {
  form: FormGroup;
  workSubType: WorkSubType;
  workTypes: WorkType[];
  filteredWorkTypes: Observable<WorkType[]>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<WorkSubTypeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { workSubType: WorkSubType, workTypes: WorkType[] }
  ) {
    this.workSubType = data.workSubType;
    this.workTypes = data.workTypes;
    this.form = this.fb.group({
      name: [this.workSubType.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      workType: [this.workSubType.workType.name || '']
    });

    this.filteredWorkTypes = this.form.get('workType')!.valueChanges.pipe(
      startWith(''),
      map(value => this.filterWorkTypes(value))
    );
  }

  filterWorkTypes(value: string): WorkType[] {
    const filterValue = value.toLowerCase();
    return this.workTypes.filter(workDirection =>
      workDirection.name.toLowerCase().includes(filterValue)
    );
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

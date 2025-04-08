import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {WorkType} from "../../../../../../shared/models/entities/directories/workType.model";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {WorkDirection} from "../../../../../../shared/models/entities/directories/workDirection.model";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-work-type-modal',
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
  templateUrl: './work-type-modal.component.html',
  styleUrls: ['./work-type-modal.component.css']
})
export class WorkTypeModalComponent {
  form: FormGroup;
  workType: WorkType;
  workDirections: WorkDirection[];
  filteredWorkDirections: Observable<WorkDirection[]>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<WorkTypeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { workType: WorkType, workDirections: WorkDirection[] }
  ) {
    this.workType = data.workType;
    this.workDirections = data.workDirections;
    this.form = this.fb.group({
      name: [this.workType.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      workDirection: [this.workType.workDirection.name || '']
    });

    this.filteredWorkDirections = this.form.get('workDirection')!.valueChanges.pipe(
      startWith(''),
      map(value => this.filterWorkDirection(value))
    );
  }

  filterWorkDirection(value: string): WorkDirection[] {
    const filterValue = value.toLowerCase();
    return this.workDirections.filter(workDirection =>
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

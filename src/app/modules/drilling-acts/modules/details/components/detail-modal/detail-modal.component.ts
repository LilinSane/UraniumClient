import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { Observable, startWith, map } from 'rxjs';

import { DrillingUnit } from '../../../../../../shared/models/entities/directories/drillingUnit.model';
import { WorkSubType } from '../../../../../../shared/models/entities/directories/workSubType.model';
import { Detail } from '../../../../../../shared/models/entities/drillingActs/detail.model';

@Component({
  selector: 'app-detail-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatRadioModule
  ],
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.css']
})
export class DetailModalComponent {
  form: FormGroup;
  drillingUnits: DrillingUnit[];
  workSubTypes: WorkSubType[];
  filteredDrillingUnits: Observable<DrillingUnit[]>;
  filteredWorkSubTypes: Observable<WorkSubType[]>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { detail: Detail, drillingUnits: DrillingUnit[], workSubTypes: WorkSubType[] }
  ) {
    const { detail, drillingUnits, workSubTypes } = data;
    this.drillingUnits = drillingUnits;
    this.workSubTypes = workSubTypes;

    this.form = this.fb.group({
      shift: [detail.shift, Validators.required],
      rotation: [detail.rotation, Validators.required],
      date: [detail.date, Validators.required],
      startTime: [detail.startTime, Validators.required],
      endTime: [detail.endTime, Validators.required],
      depth: [detail.depth, [Validators.required, Validators.min(0)]],
      drillingUnit: [detail.drillingUnit?.name, Validators.required],
      workSubType: [detail.workSubType?.name, Validators.required],
      resultGIS: [detail.resultGIS],
      drillHoleState: [detail.drillHoleState],
      acted: [detail.acted]
    });

    this.filteredDrillingUnits = this.form.get('drillingUnit')!.valueChanges.pipe(
      startWith(''),
      map(value => this.filterDrillingUnits(value))
    );

    this.filteredWorkSubTypes = this.form.get('workSubType')!.valueChanges.pipe(
      startWith(''),
      map(value => this.filterWorkSubTypes(value))
    );
  }

  private filterDrillingUnits(value: string): DrillingUnit[] {
    const filterValue = value.toLowerCase();
    return this.drillingUnits.filter(unit =>
      unit.name.toLowerCase().includes(filterValue)
    );
  }

  private filterWorkSubTypes(value: string): WorkSubType[] {
    const filterValue = value.toLowerCase();
    return this.workSubTypes.filter(type =>
      type.name.toLowerCase().includes(filterValue)
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

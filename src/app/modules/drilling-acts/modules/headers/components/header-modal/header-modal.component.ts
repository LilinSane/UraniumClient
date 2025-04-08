import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { Observable, startWith, map } from "rxjs";
import { DrillHole } from "../../../../../../shared/models/entities/directories/drillHole.model";
import { DrillingType } from "../../../../../../shared/models/entities/directories/drillingType.model";
import { Header } from "../../../../../../shared/models/entities/drillingActs/header.model";
import { MatDatepickerModule } from "@angular/material/datepicker";

@Component({
  selector: 'app-header-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    MatDatepickerModule
  ],
  templateUrl: './header-modal.component.html',
  styleUrls: ['./header-modal.component.css']
})
export class HeaderModalComponent {
  form: FormGroup;
  header: Header;
  drillHoles: DrillHole[];
  drillingTypes: DrillingType[];
  filteredDrillHoles: Observable<DrillHole[]>;
  filteredDrillingTypes: Observable<DrillingType[]>;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<HeaderModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { header: Header, drillHoles: DrillHole[], drillingTypes: DrillingType[] }) {
    this.drillHoles = data.drillHoles;
    this.drillingTypes = data.drillingTypes;
    this.header = data.header;

    this.form = this.fb.group({
      date: [this.header.date, Validators.required],
      isActive: [this.header.isActive, Validators.required],
      drillHole: [this.header.drillHole.name, Validators.required],
      drillingType: [this.header.drillingType.name, Validators.required]
    });

    this.filteredDrillHoles = this.form.get('drillHole')!.valueChanges.pipe(
      startWith(''),
      map(value => this.filterDrillHoles(value))
    );

    this.filteredDrillingTypes = this.form.get('drillingType')!.valueChanges.pipe(
      startWith(''),
      map(value => this.filterDrillingTypes(value))
    );
  }

  filterDrillHoles(value: string): DrillHole[] {
    const filterValue = value.toLowerCase();
    return this.drillHoles.filter(drillHole =>
      drillHole.name.toLowerCase().includes(filterValue)
    );
  }

  filterDrillingTypes(value: string): DrillingType[] {
    const filterValue = value.toLowerCase();
    return this.drillingTypes.filter(type =>
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

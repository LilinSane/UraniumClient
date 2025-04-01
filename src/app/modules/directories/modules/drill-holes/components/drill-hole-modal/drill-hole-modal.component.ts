import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { DirectoriesService } from "../../../../services/directories.service";
import { Observable, startWith, map } from "rxjs";
import {DrillHole} from "../../../../../../shared/models/entities/drillHole.model";
import {Area} from "../../../../../../shared/models/entities/area.model";
import {DrillHoleType} from "../../../../../../shared/models/entities/drillHoleType.model";
import {MatDatepickerModule} from "@angular/material/datepicker";

@Component({
  selector: 'app-drill-hole-modal',
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
  templateUrl: './drill-hole-modal.component.html',
  styleUrls: ['./drill-hole-modal.component.css']
})
export class DrillHoleModalComponent {
  form: FormGroup;
  drillHole: DrillHole;
  areas: Area[];
  drillHoleTypes: DrillHoleType[];
  filteredAreas: Observable<Area[]>;
  filteredDrillHoleTypes: Observable<DrillHoleType[]>;

  constructor(private ds: DirectoriesService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<DrillHoleModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { drillHole: DrillHole, areas: Area[], drillHoleTypes: DrillHoleType[] }) {
    this.areas = data.areas;
    this.drillHoleTypes = data.drillHoleTypes;
    this.drillHole = data.drillHole;
    console.log(this.drillHole.area);
    console.log(this.drillHole.drillHoleType);
    console.log(this.drillHole);
    this.form = this.fb.group({
      systemId: [this.drillHole.systemId, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      name: [this.drillHole.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      taskIssueDate: [this.drillHole.taskIssueDate, Validators.required],
      startDate: [this.drillHole.startDate, Validators.required],
      depth: [this.drillHole.depth, [Validators.required, Validators.min(0)]],
      isActive: [this.drillHole.isActive, Validators.required],
      area: [this.drillHole.area.name, Validators.required],
      drillHoleType: [this.drillHole.drillHoleType.name, Validators.required]
    });

    this.filteredAreas = this.form.get('area')!.valueChanges.pipe(
      startWith(''),
      map(value => this.filterAreas(value))
    );

    this.filteredDrillHoleTypes = this.form.get('drillHoleType')!.valueChanges.pipe(
      startWith(''),
      map(value => this.filterDrillHoleTypes(value))
    );
  }

  filterAreas(value: string): Area[] {
    const filterValue = value.toLowerCase();
    return this.areas.filter(area =>
      area.name.toLowerCase().includes(filterValue)
    );
  }

  filterDrillHoleTypes(value: string): DrillHoleType[] {
    const filterValue = value.toLowerCase();
    return this.drillHoleTypes.filter(type =>
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

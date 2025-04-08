import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {Area} from "../../../../../../shared/models/entities/directories/area.model";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {Customer} from "../../../../../../shared/models/entities/directories/customer.model";
import {DirectoriesService} from "../../../../services/directories.service";
import {map, Observable, startWith} from "rxjs";  // Измените путь, если нужно

@Component({
  selector: 'app-area-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption
  ],
  templateUrl: './area-modal.component.html',
  styleUrls: ['./area-modal.component.css']
})
export class AreaModalComponent {
  form: FormGroup;
  area: Area;
  customers: Customer[];
  filteredCustomers: Observable<Customer[]>;

  constructor(private ds: DirectoriesService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<AreaModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { area: Area, customers: Customer[] }
  ) {
    this.customers = data.customers;
    this.area = data.area;
    console.log(this.area);
    this.form = this.fb.group({
      name: [this.area.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      isActive: [this.area.isActive, Validators.required],
      customer: [this.area.customer.name, Validators.required]
    });

    this.filteredCustomers = this.form.get('customer')!.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCustomers(value))
    );
  }

  filterCustomers(value: string): Customer[] {
    const filterValue = value.toLowerCase();
    return this.customers.filter(customer =>
      customer.name.toLowerCase().includes(filterValue)
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

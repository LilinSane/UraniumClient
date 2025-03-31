import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Area, AreaDTO} from '../../../../shared/models/entities/area.model';
import { DirectoriesService } from '../../services/directories.service';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AreaModalComponent } from './components/area-modal/area-modal.component';
import { DeleteModalComponent } from '../../../../shared/components/delete-modal/delete-modal.component';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { PaginationComponent } from 'ngx-bootstrap/pagination';
import { Page } from '../../../../shared/models/page.model';
import { Sort } from '../../../../shared/models/sort.model';
import { PageRequest } from '../../../../shared/models/pageRequest.model';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { delay } from 'rxjs';
import {Customer} from "../../../../shared/models/entities/customer.model";

@Component({
  selector: 'app-areas',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    MatButton,
    PaginationComponent,
    FormsModule,
    NgIf,
    MatIcon,
    MatProgressSpinnerModule
  ],
  templateUrl: './areas.component.html',
  styleUrl: './areas.component.css'
})
export class AreasComponent implements OnInit {
  tableForm: FormGroup;
  areas: Area[];
  customers: Customer[];
  totalItems = 0;
  itemsPerPage = 10;
  currentPage = 1;
  maxSize = 5;
  numPages = 1;
  sort: Sort[];
  isLoading = false;

  constructor(
    private ds: DirectoriesService,
    private ss: SnackbarService,
    private dialog: MatDialog
  ) {
    this.tableForm = new FormGroup({});
    this.areas = [];
    this.customers = [];
    this.sort = [];
  }

  ngOnInit(): void {
    this.ds.getAll("customers", false).subscribe(
      (data: unknown[]) => {
        this.customers = data as Customer[];
      })
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    const pageRequest: PageRequest = {
      page: this.currentPage - 1,
      size: this.itemsPerPage,
      sort: this.sort
    };

    this.ds.getByPage("areas", pageRequest)
      //.pipe(delay(Math.floor(Math.random() * 2000) + 1000))
      .subscribe({
        next: (data: Page<unknown>) => {
          this.areas = data.content as Area[];
          this.totalItems = data.totalElements;
          this.isLoading = false;
        },
        error: error => {
          this.ss.showError(error.message);
          this.isLoading = false;
        }
      });
  }

  onPageChange(event: { page: number }): void {
    if (!this.isLoading) {
      if (this.currentPage !== event.page) {
        this.currentPage = event.page;
        this.loadData();
      }
    }
  }

  openModalCreate(): void {
    const dialogRef = this.dialog.open(AreaModalComponent, {
      width: '500px',
      panelClass: 'custom-dialog-container',
      data: {
        area: { name: '', isActive: false, customer: '' },
        customers: this.customers
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const selectedCustomer = this.customers.find(customer => customer.name === result.customer);
        if(selectedCustomer) {
          let areaDTO: AreaDTO = new AreaDTO(result.name, result.isActive, selectedCustomer.id);
          this.ds.create("areas", areaDTO).subscribe({
            next: () => {
              this.ss.showSuccess("Операция прошла успешно");
              this.loadData();
            },
            error: error => {
              this.ss.showError(error.error);
            }
          });
        }
      }
    });
  }

  openModalUpdate(area: Area): void {
    const dialogRef = this.dialog.open(AreaModalComponent, {
      width: '500px',
      panelClass: 'custom-dialog-container',
      data: {
        area: area,
        customers: this.customers
      }
    });

    dialogRef.afterClosed().subscribe(updatedArea => {
      if (updatedArea) {
        const selectedCustomer = this.customers.find(customer => customer.name === updatedArea.customer);
        if(selectedCustomer) {
          let areaDTO: AreaDTO = new AreaDTO(updatedArea.name, updatedArea.isActive, selectedCustomer.id);
          this.ds.update("areas", area.id, areaDTO).subscribe({
            next: () => {
              this.ss.showSuccess("Операция прошла успешно");
              this.loadData();
            },
            error: error => {
              this.ss.showError(error.error);
            }
          });
        }
      }
    });
  }

  openModalDelete(itemName: string, id: number): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '400px',
      data: { itemName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ds.delete("areas", id).subscribe({
          next: () => {
            this.ss.showSuccess("Операция прошла успешно");
            this.loadData();
          },
          error: error => {
            this.ss.showError(error.error);
          }
        });
      }
    });
  }

  toggleSort(field: string): void {
    const existingSort = this.sort.find(s => s.field === field);
    if (existingSort) {
      if (existingSort.direction === 'asc') {
        existingSort.direction = 'desc';
      } else {
        this.sort = this.sort.filter(s => s.field !== field);
      }
    } else {
      this.sort.push({ field, direction: 'asc' });
    }
    this.loadData();
  }

  getSortIcon(field: string): string | null {
    const sortItem = this.sort.find(s => s.field === field);
    if (!sortItem) {
      return 'sort';
    }
    return sortItem.direction === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }
}

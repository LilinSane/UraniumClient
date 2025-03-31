import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DirectoriesService } from "../../services/directories.service";
import { MatButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { DrillingTypeModalComponent } from "./components/drilling-type-modal/drilling-type-modal.component";
import { DeleteModalComponent } from "../../../../shared/components/delete-modal/delete-modal.component";
import { SnackbarService } from "../../../../shared/services/snackbar.service";
import { PaginationComponent } from "ngx-bootstrap/pagination";
import { Page } from "../../../../shared/models/page.model";
import { Sort } from "../../../../shared/models/sort.model";
import { PageRequest } from "../../../../shared/models/pageRequest.model";
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DrillingType } from "../../../../shared/models/entities/drillingType.model";

@Component({
  selector: 'app-drilling-types',
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
  templateUrl: './drilling-types.component.html',
  styleUrl: './drilling-types.component.css'
})
export class DrillingTypesComponent implements OnInit {
  tableForm: FormGroup;
  drillingTypes: DrillingType[] = [];
  totalItems = 0;
  itemsPerPage = 10;
  currentPage = 1;
  maxSize = 5;
  numPages = 1;
  sort: Sort[] = [];
  isLoading = false;

  constructor(private ds: DirectoriesService, private ss: SnackbarService, private dialog: MatDialog) {
    this.tableForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    const pageRequest: PageRequest = {
      page: this.currentPage - 1,
      size: this.itemsPerPage,
      sort: this.sort
    };
    this.ds.getByPage("drilling-types", pageRequest).subscribe({
      next: (data: Page<unknown>) => {
        this.drillingTypes = data.content as DrillingType[];
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
    const dialogRef = this.dialog.open(DrillingTypeModalComponent, {
      width: '500px',
      panelClass: 'custom-dialog-container',
      data: { name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ds.create("drilling-types", result).subscribe({
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

  openModalUpdate(drillingType: DrillingType): void {
    const dialogRef = this.dialog.open(DrillingTypeModalComponent, {
      width: '500px',
      panelClass: 'custom-dialog-container',
      data: drillingType
    });

    dialogRef.afterClosed().subscribe(updatedDrillingType => {
      if (updatedDrillingType) {
        this.ds.update("drilling-types", drillingType.id, updatedDrillingType).subscribe({
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

  openModalDelete(itemName: string, id: number): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '400px',
      data: { itemName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ds.delete("drilling-types", id).subscribe({
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

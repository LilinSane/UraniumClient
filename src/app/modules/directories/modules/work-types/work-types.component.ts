import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkType, WorkTypeDTO } from '../../../../shared/models/entities/directories/workType.model';
import { DirectoriesService } from '../../services/directories.service';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { WorkTypeModalComponent } from './components/work-type-modal/work-type-modal.component';
import { DeleteModalComponent } from '../../../../shared/components/delete-modal/delete-modal.component';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { PaginationComponent } from 'ngx-bootstrap/pagination';
import { Page } from '../../../../shared/models/page.model';
import { Sort } from '../../../../shared/models/sort.model';
import { PageRequest } from '../../../../shared/models/pageRequest.model';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {WorkDirection} from "../../../../shared/models/entities/directories/workDirection.model";
import {Customer} from "../../../../shared/models/entities/directories/customer.model";
import {AreaDTO} from "../../../../shared/models/entities/directories/area.model";

@Component({
  selector: 'app-work-types',
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
  templateUrl: './work-types.component.html',
  styleUrl: './work-types.component.css'
})
export class WorkTypesComponent implements OnInit {
  tableForm: FormGroup;
  workTypes: WorkType[];
  workDirections: WorkDirection[];
  totalItems = 0;
  itemsPerPage = 10;
  currentPage = 1;
  maxSize = 5;
  numPages = 1;
  sort: Sort[] = [];
  isLoading = false;

  constructor(
    private ds: DirectoriesService,
    private ss: SnackbarService,
    private dialog: MatDialog
  ) {
    this.tableForm = new FormGroup({});
    this.workDirections = [];
    this.workTypes = [];
  }

  ngOnInit(): void {
    this.ds.getAll("work-directions", false).subscribe(
      (data: unknown[]) => {
        this.workDirections = data as Customer[];
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

    this.ds.getByPage("work-types", pageRequest)
      .subscribe({
        next: (data: Page<unknown>) => {
          this.workTypes = data.content as WorkType[];
          this.totalItems = data.page.totalElements;
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
    const dialogRef = this.dialog.open(WorkTypeModalComponent, {
      width: '500px',
      panelClass: 'custom-dialog-container',
      data: { workType: { name: '', workDirection: '' }, workDirections: this.workDirections }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const selectedWorkDirection = this.workDirections.find(workDirection => workDirection.name === result.workDirection);
        if(selectedWorkDirection) {
          let workTypeDTO: WorkTypeDTO = new WorkTypeDTO(result.name, selectedWorkDirection.id);
          this.ds.create("work-types", workTypeDTO).subscribe({
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

  openModalUpdate(workType: WorkType): void {
    const dialogRef = this.dialog.open(WorkTypeModalComponent, {
      width: '500px',
      panelClass: 'custom-dialog-container',
      data: { workType: workType, workDirections: this.workDirections }
    });

    dialogRef.afterClosed().subscribe(updatedWorkType => {
      if (updatedWorkType) {
        const selectedWorkDirection = this.workDirections.find(workDirection => workDirection.name === updatedWorkType.workDirection);
        if(selectedWorkDirection) {
          let workTypeDTO: WorkTypeDTO = new WorkTypeDTO(updatedWorkType.name, selectedWorkDirection.id);
          this.ds.update("work-types", workType.id, workTypeDTO).subscribe({
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
        this.ds.delete("work-types", id).subscribe({
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

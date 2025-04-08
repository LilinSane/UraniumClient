import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkSubType, WorkSubTypeDTO } from '../../../../shared/models/entities/directories/workSubType.model';
import { DirectoriesService } from '../../services/directories.service';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { WorkSubTypeModalComponent } from './components/work-sub-type-modal/work-sub-type-modal.component';
import { DeleteModalComponent } from '../../../../shared/components/delete-modal/delete-modal.component';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { PaginationComponent } from 'ngx-bootstrap/pagination';
import { Page } from '../../../../shared/models/page.model';
import { Sort } from '../../../../shared/models/sort.model';
import { PageRequest } from '../../../../shared/models/pageRequest.model';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WorkType } from "../../../../shared/models/entities/directories/workType.model";

@Component({
  selector: 'app-work-sub-types',
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
  templateUrl: './work-sub-types.component.html',
  styleUrl: './work-sub-types.component.css'
})
export class WorkSubTypesComponent implements OnInit {
  tableForm: FormGroup;
  workSubTypes: WorkSubType[];
  workTypes: WorkType[];
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
    this.workTypes = [];
    this.workSubTypes = [];
  }

  ngOnInit(): void {
    this.ds.getAll("work-types", false).subscribe(
      (data: unknown[]) => {
        this.workTypes = data as WorkType[];
      });
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    const pageRequest: PageRequest = {
      page: this.currentPage - 1,
      size: this.itemsPerPage,
      sort: this.sort
    };

    this.ds.getByPage("work-sub-types", pageRequest)
      .subscribe({
        next: (data: Page<unknown>) => {
          this.workSubTypes = data.content as WorkSubType[];
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
    const dialogRef = this.dialog.open(WorkSubTypeModalComponent, {
      width: '500px',
      panelClass: 'custom-dialog-container',
      data: { workSubType: { name: '', workType: '' }, workTypes: this.workTypes }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const selectedWorkType = this.workTypes.find(workType => workType.name === result.workType);
        if (selectedWorkType) {
          let workSubTypeDTO: WorkSubTypeDTO = new WorkSubTypeDTO(result.name, selectedWorkType.id);
          this.ds.create("work-sub-types", workSubTypeDTO).subscribe({
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

  openModalUpdate(workSubType: WorkSubType): void {
    const dialogRef = this.dialog.open(WorkSubTypeModalComponent, {
      width: '500px',
      panelClass: 'custom-dialog-container',
      data: { workSubType: workSubType, workTypes: this.workTypes }
    });

    dialogRef.afterClosed().subscribe(updatedWorkSubType => {
      if (updatedWorkSubType) {
        const selectedWorkType = this.workTypes.find(workType => workType.name === updatedWorkSubType.workType);
        if (selectedWorkType) {
          let workSubTypeDTO: WorkSubTypeDTO = new WorkSubTypeDTO(updatedWorkSubType.name, selectedWorkType.id);
          this.ds.update("work-sub-types", workSubType.id, workSubTypeDTO).subscribe({
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
        this.ds.delete("work-sub-types", id).subscribe({
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

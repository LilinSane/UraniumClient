import { Component, OnInit } from '@angular/core';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DrillHole, DrillHoleDTO } from '../../../../shared/models/entities/directories/drillHole.model';
import { DirectoriesService } from '../../services/directories.service';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DrillHoleModalComponent } from './components/drill-hole-modal/drill-hole-modal.component';
import { DeleteModalComponent } from '../../../../shared/components/delete-modal/delete-modal.component';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { PaginationComponent } from 'ngx-bootstrap/pagination';
import { Page } from '../../../../shared/models/page.model';
import { Sort } from '../../../../shared/models/sort.model';
import { PageRequest } from '../../../../shared/models/pageRequest.model';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { delay } from 'rxjs';
import { Area } from "../../../../shared/models/entities/directories/area.model";
import { DrillHoleType } from "../../../../shared/models/entities/directories/drillHoleType.model";
import {isValidDate} from "rxjs/internal/util/isDate";

@Component({
  selector: 'app-drill-holes',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    MatButton,
    PaginationComponent,
    FormsModule,
    NgIf,
    MatIcon,
    MatProgressSpinnerModule,
    DatePipe
  ],
  templateUrl: './drill-holes.component.html',
  styleUrl: './drill-holes.component.css'
})
export class DrillHolesComponent implements OnInit {
  tableForm: FormGroup;
  drillHoles: DrillHole[];
  areas: Area[];
  drillHoleTypes: DrillHoleType[];
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
    this.drillHoles = [];
    this.areas = [];
    this.drillHoleTypes = [];
    this.sort = [];
  }

  ngOnInit(): void {
    this.ds.getAll("areas", false).subscribe(
      (data: unknown[]) => {
        this.areas = data as Area[];
      });

    this.ds.getAll("drill-hole-types", false).subscribe(
      (data: unknown[]) => {
        this.drillHoleTypes = data as DrillHoleType[];
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

    this.ds.getByPage("drill-holes", pageRequest).pipe(
      //delay(Math.floor(Math.random() * 2000) + 1000)
    ).subscribe({
        next: (data: Page<unknown>) => {
          this.drillHoles = data.content as DrillHole[];
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
    const dialogRef = this.dialog.open(DrillHoleModalComponent, {
      width: '500px',
      panelClass: 'custom-dialog-container',
      data: {
        drillHole: { systemId: '', name: '', isActive: false, area: '', drillHoleType: '' },
        areas: this.areas,
        drillHoleTypes: this.drillHoleTypes
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const selectedArea = this.areas.find(area => area.name === result.area);
        const selectedType = this.drillHoleTypes.find(type => type.name === result.drillHoleType);
        if (selectedArea && selectedType) {
          let drillHoleDTO: DrillHoleDTO = new DrillHoleDTO(result.systemId, result.name, result.taskIssueDate, result.startDate, result.isActive, selectedArea.id, selectedType.id, result.depth);
          this.ds.create("drill-holes", drillHoleDTO).subscribe({
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

  openModalUpdate(drillHole: DrillHole): void {
    const dialogRef = this.dialog.open(DrillHoleModalComponent, {
      width: '500px',
      panelClass: 'custom-dialog-container',
      data: {
        drillHole: drillHole,
        areas: this.areas,
        drillHoleTypes: this.drillHoleTypes
      }
    });

    dialogRef.afterClosed().subscribe(updatedDrillHole => {
      if (updatedDrillHole) {
        console.log(updatedDrillHole);
        const selectedArea = this.areas.find(area => area.name === updatedDrillHole.area);
        const selectedType = this.drillHoleTypes.find(type => type.name === updatedDrillHole.drillHoleType);
        if (selectedArea && selectedType) {
          let drillHoleDTO: DrillHoleDTO = new DrillHoleDTO(updatedDrillHole.systemId, updatedDrillHole.name, updatedDrillHole.taskIssueDate, updatedDrillHole.startDate, updatedDrillHole.isActive, selectedArea.id, selectedType.id, updatedDrillHole.depth);
          this.ds.update("drill-holes", drillHole.id, drillHoleDTO).subscribe({
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
        this.ds.delete("drill-holes", id).subscribe({
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

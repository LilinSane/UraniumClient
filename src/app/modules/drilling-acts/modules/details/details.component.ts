import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Detail, DetailDTO} from '../../../../shared/models/entities/drillingActs/detail.model';
import { DrillingUnit } from '../../../../shared/models/entities/directories/drillingUnit.model';
import { WorkSubType } from '../../../../shared/models/entities/directories/workSubType.model';
import { Sort } from '../../../../shared/models/sort.model';
import { DirectoriesService } from '../../../directories/services/directories.service';
import { DrillingActsService } from '../../services/drilling-acts.service';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { PageRequest } from '../../../../shared/models/pageRequest.model';
import { Page } from '../../../../shared/models/page.model';
import { DeleteModalComponent } from '../../../../shared/components/delete-modal/delete-modal.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgForOf, NgIf, DatePipe } from '@angular/common';
import { PaginationComponent } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { DetailModalComponent } from './components/detail-modal/detail-modal.component';
import {NavigationComponent} from "../../../../shared/components/navigation/navigation.component";
import {ActivatedRoute} from "@angular/router";
import {Header, HeaderDTO} from "../../../../shared/models/entities/drillingActs/header.model";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatProgressSpinner,
    NgForOf,
    NgIf,
    PaginationComponent,
    FormsModule,
    DatePipe,
    NavigationComponent
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  actId: number = 0;
  header: Header | null = null;
  details: Detail[] = [];
  drillingUnits: DrillingUnit[] = [];
  workSubTypes: WorkSubType[] = [];

  totalItems = 0;
  itemsPerPage = 10;
  currentPage = 1;
  maxSize = 5;
  numPages = 1;
  sort: Sort[] = [];
  isLoading = false;

  constructor(
    private ds: DirectoriesService,
    private da: DrillingActsService,
    private ss: SnackbarService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.actId = +this.route.snapshot.paramMap.get('id')!;
    this.ds.getAll('drilling-units', false).subscribe(
      data => this.drillingUnits = data as DrillingUnit[]
    );

    this.ds.getAll('work-sub-types', false).subscribe(
      data => this.workSubTypes = data as WorkSubType[]
    );
    this.da.getById("headers", this.actId).subscribe(
      data => {
        this.header = data as Header;
      }
    )
    this.loadData();
  }

  loadData() {
    this.isLoading = true;

    const pageRequest: PageRequest = {
      page: this.currentPage - 1,
      size: this.itemsPerPage,
      sort: this.sort
    };

    this.da.getByPage(`details/${this.actId}`, pageRequest).subscribe({
      next: (data: Page<unknown>) => {
        this.details = data.content as Detail[];
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
    if (!this.isLoading && this.currentPage !== event.page) {
      this.currentPage = event.page;
      this.loadData();
    }
  }

  openModalCreate(): void {
    const dialogRef = this.dialog.open(DetailModalComponent, {
      width: '500px',
      panelClass: 'custom-dialog-container',
      data: {
        detail: {},
        drillingUnits: this.drillingUnits,
        workSubTypes: this.workSubTypes
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const selectedDrillingUnit = this.drillingUnits.find(drillingUnit => drillingUnit.name === result.drillingUnit);
        const selectedSubType = this.workSubTypes.find(subType => subType.name === result.workSubType);
        if (selectedDrillingUnit && selectedSubType) {
          let detailDTO: DetailDTO = new DetailDTO(result.shift, result.rotation, result.date, result.startTime, result.endTime, result.depth, this.actId, selectedDrillingUnit.id, selectedSubType.id, result.resultGIS, result.drillHoleState, result.acted);
          this.da.create('details', detailDTO).subscribe({
            next: () => {
              this.ss.showSuccess('Операция прошла успешно');
              this.loadData();
            },
            error: error => this.ss.showError(error.error)
          });
        }
      }
    });
  }

  openModalUpdate(detail: Detail): void {
    const dialogRef = this.dialog.open(DetailModalComponent, {
      width: '500px',
      panelClass: 'custom-dialog-container',
      data: {
        detail: detail,
        drillingUnits: this.drillingUnits,
        workSubTypes: this.workSubTypes
      }
    });

    dialogRef.afterClosed().subscribe(updatedDetail => {
      if (updatedDetail) {
        const selectedDrillingUnit = this.drillingUnits.find(drillingUnit => drillingUnit.name === updatedDetail.drillingUnit);
        const selectedSubType = this.workSubTypes.find(subType => subType.name === updatedDetail.workSubType);
        if (selectedDrillingUnit && selectedSubType) {
          let detailDTO: DetailDTO = new DetailDTO(updatedDetail.shift, updatedDetail.rotation, updatedDetail.date, updatedDetail.startTime, updatedDetail.endTime, updatedDetail.depth, this.actId, selectedDrillingUnit.id, selectedSubType.id, updatedDetail.resultGIS, updatedDetail.drillHoleState, updatedDetail.acted);
          this.da.update('details', detail.id, detailDTO).subscribe({
            next: () => {
              this.ss.showSuccess('Операция прошла успешно');
              this.loadData();
            },
            error: error => this.ss.showError(error.error)
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
        this.da.delete('details', id).subscribe({
          next: () => {
            this.ss.showSuccess('Операция прошла успешно');
            this.loadData();
          },
          error: error => this.ss.showError(error.error)
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

  getTimeDiff(start: string, end: string): string {
    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);

    const startDate = new Date(0, 0, 0, startHours, startMinutes);
    const endDate = new Date(0, 0, 0, endHours, endMinutes);

    let diff = (endDate.getTime() - startDate.getTime()) / 60000;

    if (diff < 0) {
      diff += 24 * 60;
    }

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  // setIsActive(isActive: boolean): void {
  //   if (this.header) {
  //     let headerDTO: HeaderDTO = new HeaderDTO(this.header.date, isActive, this.header.drillingType.id, this.header.drillHole.id);
  //     this.da.update("headers", this.actId, headerDTO).subscribe({
  //       next: () => {
  //         this.ss.showSuccess('Операция прошла успешно');
  //         this.loadData();
  //
  //       },
  //       error: error => this.ss.showError(error.error)
  //     })
  //   }this.cdr.detectChanges();
  // }

}

import {Component, OnInit} from '@angular/core';
import {Header, HeaderDTO} from "../../../../shared/models/entities/drillingActs/header.model";
import {DrillHole} from "../../../../shared/models/entities/directories/drillHole.model";
import {DrillingType} from "../../../../shared/models/entities/directories/drillingType.model";
import {Sort} from "../../../../shared/models/sort.model";
import {DirectoriesService} from "../../../directories/services/directories.service";
import {DrillingActsService} from "../../services/drilling-acts.service";
import {SnackbarService} from "../../../../shared/services/snackbar.service";
import {MatDialog} from "@angular/material/dialog";
import {PageRequest} from "../../../../shared/models/pageRequest.model";
import {Page} from "../../../../shared/models/page.model";
import {DeleteModalComponent} from "../../../../shared/components/delete-modal/delete-modal.component";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {PaginationComponent} from "ngx-bootstrap/pagination";
import {FormsModule} from "@angular/forms";
import {HeaderModalComponent} from "./components/header-modal/header-modal.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-headers',
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
    RouterLink
  ],
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.css'
})
export class HeadersComponent implements OnInit {
  headers: Header[];
  drillHoles: DrillHole[];
  drillingTypes: DrillingType[];
  totalItems = 0;
  itemsPerPage = 10;
  currentPage = 1;
  maxSize = 5;
  numPages = 1;
  sort: Sort[];
  isLoading = false;

  constructor(
    private ds: DirectoriesService,
    private da: DrillingActsService,
    private ss: SnackbarService,
    private dialog: MatDialog
  ) {
    this.headers = [];
    this.drillHoles = [];
    this.drillingTypes = [];
    this.sort = [];
  }

  ngOnInit(): void {
    this.ds.getAll("drill-holes", false).subscribe(
      (data: unknown[]) => {
        this.drillHoles = data as DrillHole[];
      });

    this.ds.getAll("drilling-types", false).subscribe(
      (data: unknown[]) => {
        this.drillingTypes = data as DrillingType[];
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

    this.da.getByPage("headers", pageRequest).pipe(
      //delay(Math.floor(Math.random() * 2000) + 1000)
    ).subscribe({
      next: (data: Page<unknown>) => {
        this.headers = data.content as Header[];
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
    const dialogRef = this.dialog.open(HeaderModalComponent, {
      width: '500px',
      panelClass: 'custom-dialog-container',
      data: {
        header: { isActive: false, drillHole: '', drillingType: '' },
        drillHoles: this.drillHoles,
        drillingTypes: this.drillingTypes
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const selectedDrillHole = this.drillHoles.find(drillHole => drillHole.name === result.drillHole);
        const selectedType = this.drillingTypes.find(type => type.name === result.drillingType);
        if (selectedDrillHole && selectedType) {
          let headerDTO: HeaderDTO = new HeaderDTO(result.date, result.isActive, selectedType.id, selectedDrillHole.id);
          this.da.create("headers", headerDTO).subscribe({
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

  openModalUpdate(header: Header): void {
    const dialogRef = this.dialog.open(HeaderModalComponent, {
      width: '500px',
      panelClass: 'custom-dialog-container',
      data: {
        header: header,
        drillHoles: this.drillHoles,
        drillingTypes: this.drillingTypes
      }
    });

    dialogRef.afterClosed().subscribe(updatedHeader => {
      if (updatedHeader) {
        const selectedDrillHole = this.drillHoles.find(drillHole => drillHole.name === updatedHeader.drillHole);
        const selectedType = this.drillingTypes.find(type => type.name === updatedHeader.drillingType);
        if (selectedDrillHole && selectedType) {
          let headerDTO: HeaderDTO = new HeaderDTO(updatedHeader.date, updatedHeader.isActive, selectedType.id, selectedDrillHole.id);
          this.da.update("headers", header.id, headerDTO).subscribe({
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
        this.da.delete("headers", id).subscribe({
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

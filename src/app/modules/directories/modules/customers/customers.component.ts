import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Customer} from "../../../../shared/models/entities/directories/customer.model";
import {DirectoriesService} from "../../services/directories.service";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {CustomerModalComponent} from "./components/customer-modal/customer-modal.component";
import {DeleteModalComponent} from "../../../../shared/components/delete-modal/delete-modal.component";
import {SnackbarService} from "../../../../shared/services/snackbar.service";
import {PaginationComponent} from "ngx-bootstrap/pagination";
import {Page} from "../../../../shared/models/page.model";
import {Sort} from "../../../../shared/models/sort.model";
import {PageRequest} from "../../../../shared/models/pageRequest.model";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {delay} from "rxjs";

@Component({
  selector: 'app-customers',
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
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{
  tableForm: FormGroup;
  customers: Customer[];
  totalItems = 0;
  itemsPerPage = 10;
  currentPage = 1;
  maxSize = 5;
  numPages = 1;
  sort: Sort[];
  isLoading = false;

  constructor(private ds: DirectoriesService, private ss: SnackbarService, private dialog: MatDialog) {
    this.tableForm = new FormGroup({});
    this.customers = [];
    this.sort = [];
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.isLoading = true;
    const pageRequest: PageRequest = {
      page: this.currentPage - 1,
      size: this.itemsPerPage,
      sort: this.sort
    };
    this.ds.getByPage("customers", pageRequest).pipe(
      //delay(Math.floor(Math.random() * 2000) + 1000)
    ).subscribe({
      next: (data: Page<unknown>) => {
        this.customers = data.content as Customer[];
        this.totalItems = data.page.totalElements;
        this.isLoading = false;
      },
      error: error => {
        this.ss.showError(error.message);
        this.isLoading = false;
      }
    })
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
    const dialogRef = this.dialog.open(CustomerModalComponent, {
      width: '500px',
      panelClass: 'custom-dialog-container',
      data: {name: '', isActive: ''},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ds.create("customers", result).subscribe({
          next: () => {
            this.ss.showSuccess("Операция прошла успешно");
            this.loadData();
          },
          error: error => {
            this.ss.showError(error.error);
          }
        })
      }
    });
  }

  openModalUpdate(customer: Customer): void {
    const dialogRef = this.dialog.open(CustomerModalComponent, {
      width: '500px',
      panelClass: 'custom-dialog-container',
      data: customer
    });

    dialogRef.afterClosed().subscribe(updatedCustomer => {
      if (updatedCustomer) {
        this.ds.update("customers", customer.id, updatedCustomer).subscribe({
          next: () => {
            this.ss.showSuccess("Операция прошла успешно");
            this.loadData();
          },
          error: error => {
            this.ss.showError(error.error);
          }
        })
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
        this.ds.delete("customers", id).subscribe({
          next: () => {
            this.ss.showSuccess("Операция прошла успешно");
            this.loadData();
          },
          error: error => {
            this.ss.showError(error.error);
          }
        })
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

import {Component, Input} from '@angular/core';
import {ProductionReport} from "../../../../shared/models/entities/reports/production-report.model";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgForOf, NgIf} from "@angular/common";
import {ReportService} from "../../services/reports.service";
import {SnackbarService} from "../../../../shared/services/snackbar.service";
import {MatButton} from "@angular/material/button";
import {Period} from "../../../../shared/models/period.model";

@Component({
  selector: 'app-production-report',
  standalone: true,
  imports: [
    MatProgressSpinner,
    NgForOf,
    NgIf,
    MatButton
  ],
  templateUrl: './production-report.component.html',
  styleUrl: './production-report.component.css'
})
export class ProductionReportComponent {
  @Input() report: ProductionReport[];
  @Input() period: Period;

  constructor(
    private ss: SnackbarService,
    private rs: ReportService
  ) {
    this.report = [];
    this.period = new Period(new Date(), new Date());
  }

  downloadExcel(): void {
    this.rs.downloadProductionReportExcel(this.period.startDate, this.period.endDate).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'production-report.xlsx';
        link.click();
        URL.revokeObjectURL(url);
      },
      error: (err) => {
        this.ss.showError('Ошибка загрузки Excel файла');
      }
    });
  }
}

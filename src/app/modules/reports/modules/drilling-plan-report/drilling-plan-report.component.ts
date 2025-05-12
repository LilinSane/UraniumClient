import { Component, Input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgForOf, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { DrillingPlanReport } from '../../../../shared/models/entities/reports/drilling-plan-report.model';
import { Period } from '../../../../shared/models/period.model';
import { ReportService } from '../../services/reports.service';
import { SnackbarService } from '../../../../shared/services/snackbar.service';

@Component({
  selector: 'app-drilling-plan-report',
  standalone: true,
  imports: [
    MatProgressSpinner,
    NgForOf,
    NgIf,
    MatButton
  ],
  templateUrl: './drilling-plan-report.component.html',
  styleUrl: './drilling-plan-report.component.css'
})
export class DrillingPlanReportComponent {
  @Input() report: DrillingPlanReport[] = [];
  @Input() period: Period = new Period(new Date(), new Date());

  constructor(
    private ss: SnackbarService,
    private rs: ReportService
  ) {}

  downloadExcel(): void {
    this.rs.downloadDrillingPlanReportExcel(this.period.startDate, this.period.endDate).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'drilling-plan-report.xlsx';
        link.click();
        URL.revokeObjectURL(url);
      },
      error: () => {
        this.ss.showError('Ошибка загрузки Excel файла');
      }
    });
  }
}

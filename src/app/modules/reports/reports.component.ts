import { Component } from '@angular/core';
import { NavigationComponent } from "../../shared/components/navigation/navigation.component";
import { NgForOf, NgSwitch, NgSwitchCase } from "@angular/common";
import { TableCardComponent } from "../../shared/components/table-card/table-card.component";
import { SnackbarService } from "../../shared/services/snackbar.service";
import { MatDialog } from "@angular/material/dialog";
import { ReportModalComponent } from "./components/report-modal/report-modal.component";
import { ReportService } from "./services/reports.service";
import { Period } from "../../shared/models/period.model";
import { ProductionReportComponent } from "./modules/production-report/production-report.component";
import { DrillingPlanReportComponent } from "./modules/drilling-plan-report/drilling-plan-report.component";
import { ProductionReport } from "../../shared/models/entities/reports/production-report.model";
import { DrillingPlanReport } from "../../shared/models/entities/reports/drilling-plan-report.model";

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    NavigationComponent,
    NgForOf,
    TableCardComponent,
    NgSwitch,
    NgSwitchCase,
    ProductionReportComponent,
    DrillingPlanReportComponent
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  reportList: { key: string; title: string }[] = [
    { key: "main", title: "Производственная справка" },
    { key: "plan", title: "Выполнение плана бурения" }
  ];

  currentReport: string = "";
  period: Period = new Period(new Date(), new Date());

  productionReport: ProductionReport[] = [];
  drillingPlanReport: DrillingPlanReport[] = [];

  constructor(
    private ss: SnackbarService,
    private dialog: MatDialog,
    private rs: ReportService
  ) {}

  setCurrentTable(name: string): void {
    this.currentReport = name;
  }

  getTableTitle(): string {
    return this.reportList.find(table => table.key === this.currentReport)?.title || "";
  }

  openModalGenerate(): void {
    const dialogRef = this.dialog.open(ReportModalComponent, {
      width: '500px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.period = result;

        if (this.currentReport === 'main') {
          this.rs.getProductionReport(this.period.startDate, this.period.endDate).subscribe({
            next: report => {
              this.productionReport = report;
              this.ss.showSuccess('Производственный отчет успешно сформирован');
            },
            error: err => {
              this.ss.showError(err.error || 'Ошибка генерации отчета');
            }
          });
        }

        if (this.currentReport === 'plan') {
          this.rs.getDrillingPlanReport(this.period.startDate, this.period.endDate).subscribe({
            next: report => {
              this.drillingPlanReport = report;
              this.ss.showSuccess('Отчет по плану бурения успешно сформирован');
            },
            error: err => {
              this.ss.showError(err.error || 'Ошибка генерации отчета');
            }
          });
        }
      }
    });
  }
}

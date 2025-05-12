import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductionReport } from '../../../shared/models/entities/reports/production-report.model';
import {DrillingPlanReport} from "../../../shared/models/entities/reports/drilling-plan-report.model";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = 'http://localhost:8080/reports';

  constructor(private http: HttpClient) {}

  getProductionReport(from: Date, to: Date): Observable<ProductionReport[]> {
    const params = new HttpParams()
      .set('from', from.toISOString().split('T')[0])
      .set('to', to.toISOString().split('T')[0]);

    return this.http.get<ProductionReport[]>(`${this.baseUrl}/production-report`, { params });
  }

  downloadProductionReportExcel(from: Date, to: Date): Observable<Blob> {
    const params = new HttpParams()
      .set('from', from.toISOString().split('T')[0])
      .set('to', to.toISOString().split('T')[0]);

    return this.http.get(`${this.baseUrl}/production-report/export`, {
      params,
      responseType: 'blob'
    });
  }

  getDrillingPlanReport(from: Date, to: Date): Observable<DrillingPlanReport[]> {
    const params = new HttpParams()
      .set('from', from.toISOString().split('T')[0])
      .set('to', to.toISOString().split('T')[0]);

    return this.http.get<DrillingPlanReport[]>(`${this.baseUrl}/drilling-plan-report`, { params });
  }

  downloadDrillingPlanReportExcel(from: Date, to: Date): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/drilling-plan-report/export`, {
      params: {
        from: from.toISOString().split('T')[0],
        to: to.toISOString().split('T')[0],
      },
      responseType: 'blob'
    });
  }
}

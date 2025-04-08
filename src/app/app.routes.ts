import { Routes } from '@angular/router';
import {DirectoriesComponent} from "./modules/directories/directories.component";
import {ReportsComponent} from "./modules/reports/reports.component";
import {DrillingActsComponent} from "./modules/drilling-acts/drilling-acts.component";

export const routes: Routes = [
  {path: '', redirectTo: 'directories', pathMatch: 'full'},
  {path: 'directories', component: DirectoriesComponent},
  {path: 'acts', component: DrillingActsComponent},
  {path: 'reports', component: ReportsComponent},
];

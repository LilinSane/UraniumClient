import { Routes } from '@angular/router';
import {DirectoriesComponent} from "./modules/directories/directories.component";

export const routes: Routes = [
  {path: '', redirectTo: 'directories', pathMatch: 'full'},
  {path: 'directories', component: DirectoriesComponent},
];

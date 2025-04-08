import { Component } from '@angular/core';
import {NavigationComponent} from "../../shared/components/navigation/navigation.component";

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    NavigationComponent
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

}

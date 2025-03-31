import {Component, Input} from '@angular/core';
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-table-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './table-card.component.html',
  styleUrl: './table-card.component.css'
})
export class TableCardComponent {
  @Input() title: String;

  constructor() {
    this.title = "";
  }
}

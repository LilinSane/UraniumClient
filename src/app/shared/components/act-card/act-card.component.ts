import {Component, Input} from '@angular/core';
import {MatCard, MatCardImage, MatCardModule, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-act-card',
  standalone: true,
    imports: [MatCardModule],
  templateUrl: './act-card.component.html',
  styleUrl: './act-card.component.css'
})
export class ActCardComponent {
  @Input() docNumber: String;
  @Input() drillHoleNumber: String;

  constructor() {
    this.docNumber = "";
    this.drillHoleNumber = "";
  }
}

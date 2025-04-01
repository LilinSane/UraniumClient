import { Component } from '@angular/core';
import {NavigationComponent} from "../../shared/components/navigation/navigation.component";
import {CustomersComponent} from "./modules/customers/customers.component";
import {TableCardComponent} from "../../shared/components/table-card/table-card.component";
import {NgForOf, NgSwitch, NgSwitchCase} from "@angular/common";
import {AreasComponent} from "./modules/areas/areas.component";
import {DrillHoleTypesComponent} from "./modules/drill-hole-types/drill-hole-types.component";
import {DrillHolesComponent} from "./modules/drill-holes/drill-holes.component";
import {DrillingTypesComponent} from "./modules/drilling-types/drilling-types.component";
import {DrillingUnitsComponent} from "./modules/drilling-units/drilling-units.component";
import {WorkDirectionsComponent} from "./modules/work-directions/work-directions.component";
import {WorkTypesComponent} from "./modules/work-types/work-types.component";
import {WorkSubTypesComponent} from "./modules/work-sub-types/work-sub-types.component";

@Component({
  selector: 'app-directories',
  standalone: true,
  imports: [
    NavigationComponent,
    CustomersComponent,
    TableCardComponent,
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    AreasComponent,
    DrillHoleTypesComponent,
    DrillHolesComponent,
    DrillingTypesComponent,
    DrillingUnitsComponent,
    WorkDirectionsComponent,
    WorkTypesComponent,
    WorkSubTypesComponent
  ],
  templateUrl: './directories.component.html',
  styleUrl: './directories.component.css'
})
export class DirectoriesComponent {
  tableList: { key: string; title: string }[];
  currentTable: String;

  constructor() {
    this.tableList = [
      { key: "customer", title: "Заказчики" },
      { key: "area", title: "Участки" },
      { key: "drillHole", title: "Скважины" },
      { key: "drillHoleType", title: "Виды скважин" },
      { key: "drillingType", title: "Виды бурения" },
      { key: "drillingUnit", title: "Агрегаты" },
      { key: "workType", title: "Виды работ" },
      { key: "workSubType", title: "Подвиды работ" },
      { key: "workDirection", title: "Направления работ" },
    ];
    this.currentTable = "";
  }

  setCurrentTable(name: String): void {
    this.currentTable = name;
  }

  getTableTitle(): string {
    return this.tableList.find(table => table.key === this.currentTable)?.title || "";
  }
}

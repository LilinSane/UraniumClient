import {Component, OnInit} from '@angular/core';
import {NavigationComponent} from "../../shared/components/navigation/navigation.component";
import {AreasComponent} from "../directories/modules/areas/areas.component";
import {CustomersComponent} from "../directories/modules/customers/customers.component";
import {DrillHoleTypesComponent} from "../directories/modules/drill-hole-types/drill-hole-types.component";
import {DrillHolesComponent} from "../directories/modules/drill-holes/drill-holes.component";
import {DrillingTypesComponent} from "../directories/modules/drilling-types/drilling-types.component";
import {DrillingUnitsComponent} from "../directories/modules/drilling-units/drilling-units.component";
import {DatePipe, NgForOf, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {WorkDirectionsComponent} from "../directories/modules/work-directions/work-directions.component";
import {WorkSubTypesComponent} from "../directories/modules/work-sub-types/work-sub-types.component";
import {WorkTypesComponent} from "../directories/modules/work-types/work-types.component";
import {DrillHole} from "../../shared/models/entities/directories/drillHole.model";
import {Sort} from "../../shared/models/sort.model";
import {DirectoriesService} from "../directories/services/directories.service";
import {SnackbarService} from "../../shared/services/snackbar.service";
import {MatDialog} from "@angular/material/dialog";
import {PageRequest} from "../../shared/models/pageRequest.model";
import {Page} from "../../shared/models/page.model";
import {
  DrillHoleModalComponent
} from "../directories/modules/drill-holes/components/drill-hole-modal/drill-hole-modal.component";
import {DeleteModalComponent} from "../../shared/components/delete-modal/delete-modal.component";
import {DrillingType} from "../../shared/models/entities/directories/drillingType.model";
import {DrillingActsService} from "./services/drilling-acts.service";
import {Header, HeaderDTO} from "../../shared/models/entities/drillingActs/header.model";
import {ActCardComponent} from "../../shared/components/act-card/act-card.component";
import {PaginationComponent} from "ngx-bootstrap/pagination";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {HeadersComponent} from "./modules/headers/headers.component";

@Component({
  selector: 'app-drilling-acts',
  standalone: true,
  imports: [
    NavigationComponent,
    AreasComponent,
    CustomersComponent,
    DrillHoleTypesComponent,
    DrillHolesComponent,
    DrillingTypesComponent,
    DrillingUnitsComponent,
    NgSwitchCase,
    WorkDirectionsComponent,
    WorkSubTypesComponent,
    WorkTypesComponent,
    NgSwitch,
    NgForOf,
    ActCardComponent,
    NgIf,
    PaginationComponent,
    FormsModule,
    DatePipe,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    HeadersComponent
  ],
  templateUrl: './drilling-acts.component.html',
  styleUrl: './drilling-acts.component.css'
})
export class DrillingActsComponent {

}

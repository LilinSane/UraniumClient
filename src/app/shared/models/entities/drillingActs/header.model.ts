import {DrillingType} from "../directories/drillingType.model";
import {DrillHole} from "../directories/drillHole.model";

export class Header{
  id: number;
  date: Date;
  isActive: boolean;
  drillingType: DrillingType;
  drillHole: DrillHole;

  constructor(id: number, date: Date, isActive: boolean, drillingType: DrillingType, drillHole: DrillHole) {
    this.id = id;
    this.date = date;
    this.isActive = isActive;
    this.drillingType = drillingType;
    this.drillHole = drillHole;
  }
}

export class HeaderDTO {
  date: Date;
  isActive: boolean;
  drillingTypeId: number;
  drillHoleId: number;

  constructor(date: Date, isActive: boolean, drillingTypeId: number, drillHoleId: number) {
    this.date = date;
    this.isActive = isActive;
    this.drillingTypeId = drillingTypeId;
    this.drillHoleId = drillHoleId;
  }
}

import {Area} from "./area.model";
import {DrillHoleType} from "./drillHoleType.model";

export class DrillHole {
  id: number;
  systemId: string;
  name: string;
  isActive: boolean;
  area: Area;
  drillHoleType: DrillHoleType;

  constructor(id: number, systemId: string, name: string, isActive: boolean, area: Area, drillHoleType: DrillHoleType){
    this.id = id;
    this.systemId = systemId;
    this.name = name;
    this.isActive = isActive;
    this.area = area;
    this.drillHoleType = drillHoleType;
  }
}

export class DrillHoleDTO {
  systemId: string;
  name: string;
  isActive: boolean;
  areaId: number;
  typeId: number;

  constructor(systemId: string, name: string, isActive: boolean, areaId: number, typeId: number) {
    this.systemId = systemId;
    this.name = name;
    this.isActive = isActive;
    this.areaId = areaId;
    this.typeId = typeId;
  }
}

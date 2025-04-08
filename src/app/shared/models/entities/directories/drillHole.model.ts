import {Area} from "./area.model";
import {DrillHoleType} from "./drillHoleType.model";

export class DrillHole {
  id: number;
  systemId: string;
  name: string;
  taskIssueDate: Date;
  startDate: Date;
  isActive: boolean;
  area: Area;
  drillHoleType: DrillHoleType;
  depth: number;

  constructor(
    id: number,
    systemId: string,
    name: string,
    taskIssueDate: Date,
    startDate: Date,
    isActive: boolean,
    area: Area,
    drillHoleType: DrillHoleType,
    depth: number
  ) {
    this.id = id;
    this.systemId = systemId;
    this.name = name;
    this.taskIssueDate = taskIssueDate;
    this.startDate = startDate;
    this.isActive = isActive;
    this.area = area;
    this.drillHoleType = drillHoleType;
    this.depth = depth;
  }
}


export class DrillHoleDTO {
  systemId: string;
  name: string;
  taskIssueDate: Date;
  startDate: Date;
  isActive: boolean;
  areaId: number;
  typeId: number;
  depth: number;

  constructor(
    systemId: string,
    name: string,
    taskIssueDate: Date,
    startDate: Date,
    isActive: boolean,
    areaId: number,
    typeId: number,
    depth: number
  ) {
    this.systemId = systemId;
    this.name = name;
    this.taskIssueDate = taskIssueDate;
    this.startDate = startDate;
    this.isActive = isActive;
    this.areaId = areaId;
    this.typeId = typeId;
    this.depth = depth;
  }
}

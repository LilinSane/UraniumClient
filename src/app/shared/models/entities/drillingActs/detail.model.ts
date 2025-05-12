import {DrillingUnit} from "../directories/drillingUnit.model";
import {WorkSubType} from "../directories/workSubType.model";
import {Header} from "./header.model";

export class Detail {
  id: number;
  shift: number;
  rotation: number;
  date: Date;
  startTime: string;
  endTime: string;
  workedTime: number;
  depth: number;
  headerId: number;
  drillingUnit: DrillingUnit;
  workSubType: WorkSubType;
  resultGIS: string;
  drillHoleState: string;
  acted: number;

  constructor(
    id: number,
    shift: number,
    rotation: number,
    date: Date,
    startTime: string,
    endTime: string,
    workedTime: number,
    depth: number,
    headerId: number,
    drillingUnit: DrillingUnit,
    workSubType: WorkSubType,
    resultGIS: string,
    drillHoleState: string,
    acted: number
  ) {
    this.id = id;
    this.shift = shift;
    this.rotation = rotation;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.workedTime = workedTime;
    this.depth = depth;
    this.headerId = headerId;
    this.drillingUnit = drillingUnit;
    this.workSubType = workSubType;
    this.resultGIS = resultGIS;
    this.drillHoleState = drillHoleState;
    this.acted = acted;
  }
}

export class DetailDTO {
  shift: number;
  rotation: number;
  date: Date;
  startTime: string;
  endTime: string;
  depth: number;
  headerId: number;
  drillingUnitId: number;
  workSubTypeId: number;
  resultGIS: string;
  drillHoleState: string;
  acted: number;

  constructor(
    shift: number,
    rotation: number,
    date: Date,
    startTime: string,
    endTime: string,
    depth: number,
    headerId: number,
    drillingUnitId: number,
    workSubTypeId: number,
    resultGIS: string,
    drillHoleState: string,
    acted: number
  ) {
    this.shift = shift;
    this.rotation = rotation;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.depth = depth;
    this.headerId = headerId;
    this.drillingUnitId = drillingUnitId;
    this.workSubTypeId = workSubTypeId;
    this.resultGIS = resultGIS;
    this.drillHoleState = drillHoleState;
    this.acted = acted;
  }
}


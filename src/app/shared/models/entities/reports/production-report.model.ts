export class ProductionReport {
  drillHoleId: string;
  drillingUnitName: string;
  areaName: string;
  customerName: string;
  drillingTypeName: string;
  drilledDrillHoles: number;
  drilledDepth: number;
  actedDrillHoles: number;
  actedDepth: number;
  workedTime: number;
  downtime: number;

  constructor(
    drillHoleId: string,
    drillingUnitName: string,
    areaName: string,
    customerName: string,
    drillingTypeName: string,
    drilledDrillHoles: number,
    drilledDepth: number,
    actedDrillHoles: number,
    actedDepth: number,
    workedTime: number,
    downtime: number
  ) {
    this.drillHoleId = drillHoleId;
    this.drillingUnitName = drillingUnitName;
    this.areaName = areaName;
    this.customerName = customerName;
    this.drillingTypeName = drillingTypeName;
    this.drilledDrillHoles = drilledDrillHoles;
    this.drilledDepth = drilledDepth;
    this.actedDrillHoles = actedDrillHoles;
    this.actedDepth = actedDepth;
    this.workedTime = workedTime;
    this.downtime = downtime;
  }
}

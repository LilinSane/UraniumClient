export class DrillingPlanReport {
  drillHoleId: string;
  drillingUnitName: string;
  areaName: string;
  customerName: string;
  drillingTypeName: string;
  planedDepth: number;
  drilledDepth: number;
  actedDepth: number;
  workedTime: number;

  constructor(
    drillHoleId: string,
    drillingUnitName: string,
    areaName: string,
    customerName: string,
    drillingTypeName: string,
    planedDepth: number,
    drilledDepth: number,
    actedDepth: number,
    workedTime: number
  ) {
    this.drillHoleId = drillHoleId;
    this.drillingUnitName = drillingUnitName;
    this.areaName = areaName;
    this.customerName = customerName;
    this.drillingTypeName = drillingTypeName;
    this.planedDepth = planedDepth;
    this.drilledDepth = drilledDepth;
    this.actedDepth = actedDepth;
    this.workedTime = workedTime;
  }
}

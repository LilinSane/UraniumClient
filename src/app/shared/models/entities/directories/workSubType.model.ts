import {WorkType} from "./workType.model";

export class WorkSubType{
  id: number;
  name: string;
  workType: WorkType;

  constructor(id: number, name: string, workType: WorkType){
    this.id = id;
    this.name = name;
    this.workType = workType;
  }
}

export class WorkSubTypeDTO {
  name: string;
  typeId: number;

  constructor(name: string, typeId: number) {
    this.name = name;
    this.typeId = typeId;
  }
}


import {WorkDirection} from "./workDirection.model";

export class WorkType{
  id: number;
  name: string;
  workDirection: WorkDirection;

  constructor(id: number, name: string, workDirection: WorkDirection){
    this.id = id;
    this.name = name;
    this.workDirection = workDirection;
  }
}

export class WorkTypeDTO {
  name: string;
  directionId: number;

  constructor(name: string, directionId: number) {
    this.name = name;
    this.directionId = directionId;
  }
}


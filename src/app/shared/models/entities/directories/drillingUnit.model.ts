
export class DrillingUnit {
  id: number;
  name: string;
  inventoryNumber: string;
  isActive: boolean;

  constructor(id: number, inventoryNumber: string, name: string, isActive: boolean){
    this.id = id;
    this.name = name;
    this.inventoryNumber = inventoryNumber;
    this.isActive = isActive;
  }
}

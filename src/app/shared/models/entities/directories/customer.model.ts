
export class Customer{
  id: number;
  name: string;
  taxpayerNum: string;
  isActive: boolean;

  constructor(id: number, name: string, taxpayerNum: string, isActive: boolean){
  this.id = id;
  this.name = name;
  this.taxpayerNum = taxpayerNum;
  this.isActive = isActive;
  }
}

import {Customer} from "./customer.model";

export class Area{
  id: number;
  name: string;
  isActive: boolean;
  customer: Customer;

  constructor(id: number, name: string, isActive: boolean, customer: Customer){
    this.id = id;
    this.name = name;
    this.isActive = isActive;
    this.customer = customer;
  }
}

export class AreaDTO {
  name: string;
  isActive: boolean;
  customerId: number;

  constructor(name: string, isActive: boolean, customerId: number) {
    this.name = name;
    this.isActive = isActive;
    this.customerId = customerId;
  }
}


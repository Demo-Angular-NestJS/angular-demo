import { IBase } from "@m/interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class BaseModel implements IBase{
  id!: string;
  createdBy!: string;
  createdAt!: Date;
  updatedAt!: Date;
  updatedBy!: string ;
}

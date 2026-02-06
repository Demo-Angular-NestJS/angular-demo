import { IBase } from "@m/interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class BaseModel implements IBase {
  id!: string;
  createdBy!: string;
  createdAt!: Date;
  updatedAt!: Date;
  updatedBy!: string;

  public initialize(data: Partial<any>) {
    if (data) {
      Object.keys(this).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          (this as any)[key] = data[key];
        }
      });

      Object.keys(this).forEach((key) => {
        if ((this as any)[key] === undefined) {
          delete (this as any)[key];
        }
      });
    }
  }
}

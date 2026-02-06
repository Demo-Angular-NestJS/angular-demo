/* eslint-disable @typescript-eslint/no-explicit-any */
export class LoginModel {
  email!: string;
  password!: string;

  constructor(data: Partial<any>) {
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

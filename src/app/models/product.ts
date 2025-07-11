export class Product {
  constructor(initData?: Partial<Product>) {
    if (initData) {
      Object.assign(this, initData);
    }
  }

  id!: string | number;

  name!: string;

  company!: string;

  authors!: string[];

  price!: number;

  isShow!: boolean;

  photoUrl!: string;

  createDate!: Date;
}

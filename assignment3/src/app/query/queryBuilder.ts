import { Document, Model, Query } from "mongoose";

interface IQueryParams {
  filter?: string;
  sortBy?: string;
  sort?: "asc" | "desc" | "1" | "-1";
  limit?: string;
  page?: string;
  [key: string]: any;
}

export class QueryBuilder<T extends Document> {
  public query: Query<T[], T>;
  private queryString: IQueryParams;

  constructor(model: Model<T>, queryString: IQueryParams) {
    this.query = model.find();
    this.queryString = queryString;
  }

  filter(): this {
    if (this.queryString.filter) {
      this.query = this.query.find({ genre: this.queryString.filter });
    }
    return this;
  }

  sort(): this {
    const sortBy: string | "createdAt" = this.queryString.sortBy ?? "createdAt";
    if (sortBy) {
      let sort: string = this.queryString.sort ?? "desc";

      this.query = this.query.sort({ [sortBy]: sort } as any);
    }
    return this;
  }

  limit(): this {
    const limit = parseInt(this.queryString.limit as any);
    if (limit) {
      this.query = this.query.limit(limit);
    }
    return this;
  }

  async exec(): Promise<T[]> {
    return this.query.exec();
  }
}

import { IReturnModel } from "../interfaces/IReturnModel";
import { OrderBy } from "./enum";

export interface PaginationRequest {
    page: number;
    size: number;
    sortBy?: string;
    orderBy?: OrderBy;
    [key: string]: any;
  }
  export interface PaginationResponse {
    page: number;
    total: number;
    size: number;
  }
  
  export interface ListResponse {
    data: any[];
    pagination?: PaginationResponse;
  }
  export interface TypedResponse<T> extends IReturnModel  {
    data: T[];
    pagination?: PaginationResponse;
    errorHolder:Error;
  }
  
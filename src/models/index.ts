import React from "react";

export interface IBank {
  ifsc: string;
  bank_id: number;
  branch: string;
  address: string;
  city: string;
  district: string;
  state: string;
  bank_name: string;
}

export interface IPaginationContextProps {
  nextPage(): void;
  prevPage(): void;
  goToPage(pageNumber: number): void;
  currentPage: number;
  totalPage: number;
  list: Array<IBank>;
}
export interface IPaginationProviderProps {
  value: Array<IBank>;
  children: React.ReactElement<any, any>;
  page?: number;
}

export interface IPaginaition {
  PaginationProvider: React.FunctionComponent<IPaginationProviderProps>;
  usePaginationContext(): IPaginationContextProps;
}

export enum FILTER_TYPES {
  "NO FILTER",
  "BANKNAME",
  "IFSCCODE"
}

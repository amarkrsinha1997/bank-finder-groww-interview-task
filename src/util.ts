import { IBank } from "./models";

export const filterSelection: Record<string, Function> = {
  IFSCCODE: (banks: IBank[]) => (searchTerm: string) => {
    return banks.filter(
      (bank) => bank.ifsc.toLowerCase().indexOf(searchTerm) > -1
    );
  },
  BANKNAME: (banks: IBank[]) => (searchTerm: string) => {
    return banks.filter(
      (bank) => bank.bank_name.toLowerCase().indexOf(searchTerm) > -1
    );
  },
  "NO FILTER": (banks: IBank[]) => (searchTerm: string) => {
    return banks;
  }
};

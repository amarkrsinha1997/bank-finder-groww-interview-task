const filter = {
  noFilter: "NO FILTER",
  ifscCode: "IFSCCODE",
  bankName: "BANKNAME"
};
const CITIES = ["MUMBAI", "BANGALORE", "DELHI", "PUNE", "HYDERABAD"];
const FILTERS = [filter.noFilter, filter.ifscCode, filter.bankName];

// hours * minute * seconds * milliseconds
const cacheDuration = 3 * 60 * 60 * 1000;
const baseUrl = "https://vast-shore-74260.herokuapp.com";
const bankPerPage = 10;

const links = [
  {
    name: "All Page",
    link: "/all-banks"
  }
];

const localStorageKey = {
  bankDetail: "bankDetail"
};
const urls = {
  allBanks: "/all-banks",
  bankDetails: "/bank-details"
};
export {
  urls,
  filter,
  CITIES,
  FILTERS,
  cacheDuration,
  baseUrl,
  bankPerPage,
  links,
  localStorageKey
};

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { bankApi } from "../ApiService";
import { PaginationProvider } from "../context/PaginationContext";
import { IBank } from "../models";
import { DropDown } from "../components/Dropdown";
import { BankList } from "../components/BankList";
import { Pagination } from "../components/Pagination";
import { useDebounce } from "../hooks/useDebounce";
import { CITIES, FILTERS, filter } from "../config";
import { filterSelection } from "../util";

const Content = styled.main`
  padding: 10px;
  width: 100%;
`;

const Header = styled.header`
  padding: 10px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 5px;
`;

export function AllBanks() {
  const [selectedCityIndex, setSelectedCityIndex] = useState(0);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(() =>
    FILTERS.indexOf(filter.noFilter)
  );

  const [banks, setBanks] = useState<Array<IBank>>([]);
  const [filteredBanks, setFilteredBanks] = useState<Array<IBank>>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    bankApi.getBankList(CITIES[selectedCityIndex]).then((banksR) => {
      setBanks(banksR);
      setFilteredBanks(banksR);
    });
  }, [selectedCityIndex]);

  const onCityDropDownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = CITIES.indexOf(e.target.value);
    setSelectedCityIndex(index);
    setSearchTerm("");
    setSelectedFilterIndex(FILTERS.indexOf(filter.noFilter));
  };
  const onFilterDropDownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = FILTERS.indexOf(e.target.value);
    setSelectedFilterIndex(index);
    setSearchTerm("");
  };

  const onSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  };

  const debounceSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const filterType = FILTERS[selectedFilterIndex];
    const filterFunc = filterSelection[filterType](banks);
    setFilteredBanks(filterFunc(debounceSearchTerm.toLowerCase()));
  }, [debounceSearchTerm, selectedFilterIndex, banks]);

  return (
    <PaginationProvider value={filteredBanks}>
      <Content>
        <Header>
          <DropDown
            options={CITIES}
            onChange={onCityDropDownChange}
            dropDownName="Cities"
            selectedIndex={selectedCityIndex}
          />
          <DropDown
            options={FILTERS}
            onChange={onFilterDropDownChange}
            dropDownName="Filter By"
            selectedIndex={selectedFilterIndex}
          />
          <Input
            name="search"
            onChange={onSearchTermChange}
            placeholder="Search"
            value={searchTerm}
            disabled={selectedFilterIndex === FILTERS.indexOf(filter.noFilter)}
          />
        </Header>
        <BankList />
        <Pagination />
      </Content>
    </PaginationProvider>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { usePaginationContext } from "../context/PaginationContext";
import { localStorageKey, urls } from "../config";

const Table = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;
const Row = styled.tr`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;
const Cell = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;
const HeadCell = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;
const Container = styled.div`
  overflow-y: scroll;
`;
const StyledLink = styled(Link)`
  color: #0033bb;
  text-decoration: none;
  :hover {
    color: #ff00ee;
  }
`;
export const BankList = () => {
  const paginationContext = usePaginationContext();
  const { list: banks } = paginationContext;
  return (
    <Container>
      <Table>
        <thead>
          <Row>
            <HeadCell>Bank Id</HeadCell>
            <HeadCell>Bank Name</HeadCell>
            <HeadCell>Branch</HeadCell>
            <HeadCell>IFSC Code</HeadCell>
            <HeadCell>Address</HeadCell>
          </Row>
        </thead>
        <tbody>
          {banks.map((bank) => (
            <Row key={bank.bank_id + bank.ifsc}>
              <Cell>{bank.bank_id}</Cell>
              <Cell>{bank.bank_name}</Cell>
              <Cell>{bank.branch}</Cell>
              <Cell>
                <StyledLink
                  to={(location: any) => {
                    localStorage.setItem(
                      localStorageKey.bankDetail,
                      JSON.stringify(bank)
                    );
                    return {
                      ...location,
                      pathname: urls.bankDetails + "/" + bank.ifsc
                    };
                  }}
                >
                  {bank.ifsc}
                </StyledLink>
              </Cell>
              <Cell>{bank.address}</Cell>
            </Row>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

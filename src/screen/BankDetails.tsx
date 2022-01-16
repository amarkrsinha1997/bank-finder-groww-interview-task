import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { localStorageKey, urls } from "../config";
import { IBank } from "../models";

const TextBox = styled.div`
  font-size: 15px;
  margin-bottom: 5px;
`;

const Main = styled.div`
  padding: 10px;
  margin-top: 10px;
`;
export const BankDetails = () => {
  const [bankDetail, setBankDetail] = useState({} as IBank);
  const history = useHistory();

  useEffect(() => {
    const bankDetailInLS = localStorage.getItem(localStorageKey.bankDetail);
    if (bankDetailInLS) {
      setBankDetail(JSON.parse(bankDetailInLS));
      localStorage.removeItem(localStorageKey.bankDetail);
    } else {
      history.push(urls.allBanks);
    }
  }, [history]);
  return (
    <Main>
      <TextBox>
        <b>Bank Id:</b> {bankDetail.bank_id}
      </TextBox>
      <TextBox>
        <b>Bank Name:</b> {bankDetail.bank_name}
      </TextBox>
      <TextBox>
        <b>Branch Name:</b> {bankDetail.branch}
      </TextBox>
      <TextBox>
        <b>Address: </b>
        {bankDetail.address}
      </TextBox>
      <TextBox>
        <b>IFSC Code:</b> {bankDetail.ifsc}
      </TextBox>
      <TextBox>
        <b>District: </b>
        {bankDetail.district}
      </TextBox>
      <TextBox>
        <b>City: </b>
        {bankDetail.city}
      </TextBox>
      <TextBox>
        <b>State: </b>
        {bankDetail.state}
      </TextBox>
    </Main>
  );
};

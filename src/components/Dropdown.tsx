import React from "react";
import styled from "styled-components";

const Select = styled.select`
  padding: 10px;
  font-size: 15px;
  margin-bottom: 5px;
`;
const Option = styled.option``;
interface IProps {
  onChange(e: React.ChangeEvent<HTMLSelectElement>): void;
  options: Array<string>;
  dropDownName: string;
  selectedIndex: number;
}
export const DropDown = (props: IProps) => {
  const { onChange, options, dropDownName, selectedIndex } = props;

  return (
    <Select name={dropDownName} onChange={onChange}>
      {options.map((option, index) => (
        <Option value={option} key={option} selected={selectedIndex === index}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

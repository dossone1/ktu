import styled from "styled-components";
import { colors } from "../../utils/colors";

export const DuesTableRow = styled.div`
  display: flex;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 5px;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.5s all ease-in-out;

  :hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const DuesCheck = styled.div`
  border: 2px solid rgba(0, 0, 0, 0.1);
  margin-right: 10px;
  padding: 2px;
  border-radius: 50%;
`;

export const DuesDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({active})=> active ? colors.primary : "white"};
  border-radius: 50%;
`;

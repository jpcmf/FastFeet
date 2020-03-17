import styled from 'styled-components';

import { darken } from 'polished';

export const Container = styled.div`
  margin: 30px auto;
  width: 1200px;
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  div.headerButtons {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  p {
    font-size: 24px;
    font-weight: bold;
    line-height: 28px;
    text-align: left;
  }
`;

export const StyledButton = styled.button`
  align-items: center;
  background-color: #cccccc;
  border-radius: 4px;
  border: 0;
  color: #fff;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  font-weight: bold;
  padding: 8px 15px;
  transition: background-color 300ms ease;

  &:hover {
    background-color: ${darken(0.07, '#cccccc')};
  }

  & + button {
    background-color: #7d40e7;
    margin-left: 16px;
  }

  & + button:hover {
    background-color: ${darken(0.07, '#7D40E7')};
  }

  svg {
    margin-right: 8px;
  }
`;

export const Content = styled.div`
  background-color: #fff;
  border-radius: 4px;
  margin-top: 20px;
  padding: 35px 30px;

  span {
    font-weight: bold;
    color: #444;
    font-size: 14px;
  }

  div.data {
    margin-top: 20px;

    input {
      border-radius: 4px;
      border: 1px solid #ccc;
      color: #999;
      font-size: 16px;
      margin-top: 9px;
      outline: 0;
      padding: 12.5px 12px;
      width: 100%;
    }
  }
`;

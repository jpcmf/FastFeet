import styled from 'styled-components';
import { Form } from '@rocketseat/unform';
import { darken } from 'polished';

export const Container = styled.div`
  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-10%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  animation: 1s ease-out 0s 1 slideInFromLeft;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const StyledForm = styled(Form)`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 10px #00000033;
  display: flex;
  flex-direction: column;
  padding: 60px 30px;
  width: 360px;

  img {
    margin: 0 auto 25px;
    max-width: 90%;
    width: 90%;
  }

  label {
    color: #444;
    display: block;
    font-size: 14px;
    font-weight: bold;
    line-height: 19px;
    margin-bottom: 10px;
    margin-top: 15px;
  }

  input {
    border-radius: 4px;
    border: 1px solid #dddddd;
    color: #999;
    font-size: 16px;
    height: 45px;
    padding: 0 15px;
    width: 100%;

    &::placeholder {
      color: #999;
    }
  }

  button {
    background-color: #7d40e7;
    border-radius: 4px;
    border: 0;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    line-height: 21px;
    margin-top: 15px;
    padding: 12px;
    transition: background-color 300ms ease;

    &:hover {
      background-color: ${darken(0.07, '#7d40e7')};
    }
  }

  span {
    animation: 300ms ease-out 0s 1 slideInFromLeft;
    color: ${darken(0.05, '#ee4d64')};
    display: block;
    padding: 7px;
    border-radius: 15px;
    font-size: 12px;
  }
`;

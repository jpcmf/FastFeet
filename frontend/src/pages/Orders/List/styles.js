import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import AsyncSelect from 'react-select/async';

import { darken } from 'polished';

export const Container = styled.div`
  margin: 30px auto;
  position: relative;
  width: 1200px;

  header {
    p {
      font-size: 24px;
      font-weight: bold;
      line-height: 28px;
      text-align: left;
    }
  }

  > div {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 34px;

    div.search {
      align-items: center;
      background-color: #fff;
      border-radius: 4px;
      border: solid 1px #ddd;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      padding: 10px;

      input {
        border: 0;
        color: #999;
        font-size: 14px;
        line-height: 16px;
        margin-left: 10px;
      }
    }
  }

  footer {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 30px;
  }
`;

const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

export const BodyContent = styled.div`
  div.loadingIndicator {
    display: ${props => (props.visible ? 'flex' : 'none')};
    flex: 1;
    justify-content: center;
    margin-top: 100px;

    svg {
      animation: ${rotate} 2s linear infinite;
    }
  }

  span.noData {
    color: #7d40e7;
    font-size: 19px;
    margin: 40px auto;
    padding: 23px;
  }

  div.table {
    display: flex;
    display: ${props => (!props.visible ? 'flex' : 'none')};
    flex-direction: column;
    flex: 1;

    div.line {
      display: grid;
      grid-template-columns: 8% 25% 24% 13% 10% 15% 5%;
      width: 100%;
      background: #fff;
      margin-bottom: 21px;
      color: #666;
      font-size: 16px;
      text-align: left;
      align-items: center;
      padding: 16px;
      border-radius: 4px;

      div {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      div.tableTitle {
        > button {
          background: #fff;
          border: 0px;
          font-weight: bold;
        }
      }
    }

    div.lineTitle {
      font-weight: bold;
      background: none;
      margin-bottom: 8px;
    }

    img {
      width: 35px;
      height: 35px;
      margin-right: 8px;
      border-radius: 50%;
    }
  }
`;

export const StyledLink = styled(Link)`
  align-items: center;
  background-color: #7d40e7;
  border-radius: 4px;
  border: 0;
  color: #fff;
  display: flex;
  flex-direction: row;
  font-weight: bold;
  padding: 10px 15px;
  text-decoration: none;
  transition: background-color 300ms ease;

  &:hover {
    background-color: ${darken(0.07, '#7D40E7')};
  }

  svg {
    margin-right: 8px;
  }
`;

export const Button = styled.button`
  background-color: #7d40e7;
  color: #fff;
  padding: 10px;
  font-weight: bold;
  border: 0;
  border-radius: 4px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};

  &:hover {
    background-color: ${props =>
      props.disabled ? '#7D40E7' : `${darken(0.07, '#7D40E7')}`};
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  }
`;

export const CustomAsyncSelect = styled(AsyncSelect)`
  width: 300px;
`;

export const StatusContent = styled.div`
  align-items: center;
  background-color: ${props => props.status.background};
  border-radius: 15px;
  color: ${props => props.status.color};
  display: flex;
  font-size: 14px;
  font-weight: bold;
  justify-content: center;
  padding: 3px 10px 3px 22px;
  position: relative;

  span {
    &:before {
      position: absolute;
      content: '';
      height: 10px;
      width: 10px;
      left: 8px;
      top: 6px;
      background: ${props => props.status.color};
      border-radius: 50%;
    }
  }
`;

export const ActionButton = styled.button``;

export const ContextMenu = styled.div`
  display: ${props =>
    props.visible === true ? 'block !important' : 'none !important'};
  position: relative;

  button {
    background: none;
    font-weight: 100;
    color: #999;
    border: 0;
    font-size: 16px;
    margin-left: 5px;
  }

  span.actionDelete {
    display: ${props =>
      props.available === true ? 'block !important' : 'none !important'};
  }

  ul {
    background-color: #fff;
    border-radius: 4px;
    border: solid 1px #ddd;
    box-shadow: 2px 1px 5px #a0a0a0;
    padding: 10px;
    position: absolute;
    transform: translate(-50%, -119%);
    z-index: 999;

    li {
      align-items: center;
      color: #999;
      display: flex;
      flex-direction: row;
      font-weight: 100;
      padding: 8px 15px;

      > svg {
        margin-right: -27px;
      }

      button {
        padding-left: 35px;
      }

      &:hover {
        background: #eee;
      }

      & + span {
        border-top: 1px solid #eee;
      }

      & + li {
        border-top: 1px solid #eee;
      }
    }
  }
`;

export const ModalShowOrder = styled.div`
  visibility: ${props => (props.visible ? 'block' : 'hidden')};
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  display: flex;
  left: 0;
  top: 0;
  z-index: 9999;
  margin: 0;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  border-radius: 4px;
  width: 500px;
  max-width: 500px;
  background: #fff;

  button {
    border: 0;
    background-color: #7d40e7;
    border-radius: 50%;
    padding: 5px;
    align-self: flex-end;
    margin-top: -40px;
    font-size: 16px;
    width: 35px;
    border: 3px solid #fff;
    font-weight: bold;
    height: 35px;
    color: #fff;
  }

  p {
    font-size: 16px;
    color: #666;
    line-height: 26px;
  }

  p.modalTitle {
    font-size: 14px;
    color: #444;
    font-weight: bold;
  }

  hr {
    border: 0;
    border-bottom: solid 1px #eee;
    margin: 10px 0;
  }

  img {
    max-width: 100%;
    width: 100%;
    height: auto;
  }
`;

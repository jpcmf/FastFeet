import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

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
      padding: 7px 10px;
      max-width: 237px;
      width: 100%;

      input {
        border: 0;
        color: #999;
        font-size: 14px;
        line-height: 16px;
        margin-left: 10px;
        width: 100%;
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
      grid-template-columns: 10% 10% 30% 45% 5%;
      width: 100%;
      background: #fff;
      margin-bottom: 21px;
      color: #666;
      font-size: 16px;
      text-align: left;
      align-items: center;
      padding: 11px 14px 11px 25px;
      border-radius: 4px;

      div {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      div.tableTitle {
        > button {
          background-color: #fff;
          border: 0px;
          font-weight: bold;
          margin-left: auto;
          display: flex;
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
  font-size: 14px;
  font-weight: bold;
  padding: 8px 15px;
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
    /* border: solid 1px #ddd; */
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
    padding: 10px;
    position: absolute;
    /* transform: translate(-50%, -119%); */
    right: 35px;
    z-index: 2;
    top: -5px;

    li {
      align-items: center;
      color: #999;
      display: flex;
      flex-direction: row;
      font-weight: 100;
      padding: 7px 15px 7px 0;

      &:hover {
        /* background-color: #f5f5f5; */
        button {
          opacity: 0.8;
        }
      }

      > svg {
        margin-right: -27px;
      }

      button {
        padding-left: 35px;
        transition: all 300ms ease;
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

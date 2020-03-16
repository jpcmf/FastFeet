import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  display: flex;
  flex-direction: row;
  padding: 13px 0;
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 30px;
  width: 100%;

  nav {
    align-items: center;
    display: flex;
    flex-direction: row;

    .logo {
      padding: 0;

      img {
        border-right: 1px solid #dddddd;
        height: 26px;
        margin-right: 20px;
        padding-right: 30px;
      }
    }

    a {
      color: #999999;
      font-size: 15px;
      font-weight: bold;
      line-height: 18px;
      padding: 20px 10.5px;
      text-decoration: none;
      transition: color 300ms ease;

      &:hover {
        color: #444;
      }
    }
  }

  aside {
    display: flex;
  }
`;

export const Profile = styled.div`
  div {
    display: flex;
    flex-direction: column;

    strong {
      color: #666666;
      font-size: 14px;
      font-weight: bold;
    }

    a {
      color: #de3b3b;
      font-size: 14px;
      line-height: 16px;
      margin-top: 4px;
      text-align: right;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

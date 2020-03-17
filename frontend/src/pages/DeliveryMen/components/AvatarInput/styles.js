import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      background-color: #fff;
      border-radius: 50%;
      height: 150px;
      width: 150px;
    }

    input {
      display: none;
    }
  }

  div.avatar {
    align-items: center;
    border-radius: 50%;
    border: 2px dashed #ddd;
    display: flex;
    flex-direction: column;
    height: 180px;
    justify-content: center;
    margin: 0 auto;
    width: 180px;

    svg {
      margin-top: -15px;
    }

    p {
      color: #ddd;
      font-size: 16px;
      font-weight: bold;
    }
  }
`;

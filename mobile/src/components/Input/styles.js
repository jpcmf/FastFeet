import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #fff;
  border: solid 1px #ddd;
  border-radius: 4px;
  height: 45px;
  padding: 0;

  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  color: #444;
  flex: 1;
  font-size: 16px;
  margin-left: 0px;
`;

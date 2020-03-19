import styled from 'styled-components/native';
import { TextInput } from 'react-native';

import Button from '~/components/Button';

export const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;

export const TopBox = styled.View`
  align-items: center;
  background-color: #7d40e7;
  height: 170px;
  width: 100%;
`;

export const ReportContainer = styled.View`
  margin-top: 100px;
  width: 90%;
`;

export const Form = styled.View`
  height: 300px;
`;

export const StyledTextInput = styled(TextInput)`
  background-color: #fff;
  border-radius: 4px;
  /* border: 1px solid #eee; */
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  color: #999;
  flex: 1;
  font-size: 16px;
  margin-bottom: 20px;
  padding: 20px;
`;

export const StyledButton = styled(Button)`
  background-color: #7d40e7;
`;

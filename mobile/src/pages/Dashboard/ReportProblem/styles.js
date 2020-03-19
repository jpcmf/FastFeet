import styled from 'styled-components/native';
import { TextInput } from 'react-native';

import Button from '~/components/Button';

export const Container = styled.View`
  background-color: #fff;
  elevation: 1;
  flex: 1;
  padding: 20px;
`;

export const ReportContainer = styled.View`
  background-color: #fff;
  border-radius: 4px;
  elevation: 0;
  flex: 1;
  /* margin-top: -90px; */
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

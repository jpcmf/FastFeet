import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  background-color: #fff;
  flex: 1;
  justify-content: center;
  padding: 35px;
  text-align: left;
`;

export const Avatar = styled.Image`
  border-radius: 80px;
  height: 136px;
  margin-bottom: 40px;
  margin-left: auto;
  margin-right: auto;
  width: 136px;
`;

export const NameTitle = styled.Text`
  color: #666666;
  font-size: 12px;
  line-height: 26px;
`;

export const Name = styled.Text`
  color: #444444;
  font-size: 22px;
  font-weight: bold;
  line-height: 29px;
  margin-bottom: 10px;
`;

export const EmailTitle = styled.Text`
  color: #666666;
  font-size: 12px;
  line-height: 26px;
`;

export const Email = styled.Text`
  color: #444444;
  font-size: 22px;
  font-weight: bold;
  line-height: 29px;
  margin-bottom: 10px;
`;

export const CreatedDateTitle = styled.Text`
  color: #666666;
  font-size: 12px;
  line-height: 26px;
`;

export const CreatedDate = styled.Text`
  color: #444444;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Logout = styled(TouchableOpacity)`
  background-color: #e74040;
  border-radius: 4px;
  height: 40px;
  justify-content: center;
  margin-top: 20px;
`;

export const LogoutText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

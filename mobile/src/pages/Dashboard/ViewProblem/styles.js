import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

export const Container = styled.View`
  background-color: #fff;
  elevation: 1;
  flex: 1;
  padding: 20px;
`;

export const ViewContainer = styled.View`
  background-color: #fff;
  border-radius: 4px;
  elevation: 0;
  flex: 1;
`;

export const OrderBox = styled.View`
  /* margin-top: -95px; */
  elevation: 1;
  margin-bottom: 20px;
`;

export const OrderName = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

export const ProblemsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const NoOrderText = styled.Text`
  color: #7d40e7;
  font-size: 16px;
  margin-top: 20px;
  padding: 20px;
  text-align: center;
`;

export const StyledActivityIndicator = styled(ActivityIndicator)`
  padding: 20px;
`;

export const ProblemBox = styled.View`
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #eee;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  flex-direction: row;
  height: 55px;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 0 10px 0 19px;
`;

export const ProblemDescription = styled.Text`
  color: #999999;
  font-size: 16px;
  line-height: 21px;
  flex: 1;
`;

export const ProblemDate = styled.Text`
  color: #c1c1c1;
  font-size: 12px;
  /* padding: 0 10px 0; */
  /* margin-bottom: 8px; */
`;

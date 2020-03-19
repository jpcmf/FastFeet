import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  background-color: #fff;
  /* elevation: 1; */
  flex: 1;
  padding: 20px;
  position: relative;
  z-index: 20;
`;

export const InfoContainer = styled.ScrollView`
  /* elevation: 0; */
  background-color: #fff;
  border-radius: 4px;
  flex: 1;
  /* margin-top: -90px; */
`;

export const OrderInfo = styled.View`
  border-radius: 4px;
  border: 1px solid #eee;
  padding: 15px;
`;

export const InfoTitle = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const TitleText = styled.Text`
  color: #7d40e7;
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
`;

export const OrderInfoTitle = styled.Text`
  color: #999999;
  font-size: 14px;
  font-weight: bold;
  line-height: 19px;
  margin-bottom: 5px;
  margin-top: 10px;
`;
export const OrderInfoText = styled.Text`
  font-size: 14px;
  color: #666666;
  line-height: 22px;
`;

export const DeliveryInfo = styled.View`
  border: 1px solid #eee;
  padding: 15px;
  border-radius: 4px;
  margin-top: 5px;
`;

export const DeliveryInfoTitle = styled.Text`
  color: #999999;
  font-size: 14px;
  font-weight: bold;
  line-height: 19px;
  margin-bottom: 5px;
  margin-top: 10px;
`;

export const DeliveryInfoText = styled.Text`
  font-size: 14px;
  color: #666666;
  line-height: 22px;
`;

export const DeliveryDates = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const DeliveryDateTitle = styled.Text`
  color: #999999;
  font-size: 14px;
  font-weight: bold;
  line-height: 19px;
  margin-bottom: 5px;
  margin-top: 10px;
`;

export const DeliveryDateText = styled.Text`
  color: #666666;
  font-size: 14px;
  line-height: 22px;
`;

export const DeliveryStartDate = styled.View``;

export const DeliveryEndDate = styled.View``;

export const ActionButtons = styled.View`
  margin-top: 5px;
`;

export const Withdraw = styled(TouchableOpacity)`
  background-color: #e74040;
  border-radius: 4px;
  padding: 15px;
`;

export const WithdrawText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

export const Action = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const ActionBox = styled(TouchableOpacity)`
  align-items: center;
  background-color: #f8f9fd;
  border: 1px solid #eee;
  flex: 1;
  padding: 10px;
`;

export const ActionText = styled.Text`
  color: #999999;
  font-size: 12px;
  line-height: 16px;
  margin-top: 2px;
  text-align: center;
`;

import styled from 'styled-components/native';
import { TouchableOpacity, Dimensions } from 'react-native';

import { RNCamera } from 'react-native-camera';

export const Container = styled.View`
  background-color: #fff;
  elevation: 1;
  flex: 1;
  padding: 20px;
`;

export const ConfirmContainer = styled.View`
  background-color: #fff;
  elevation: 0;
  overflow: hidden;
  flex: 1;
  margin-top: -90px;
  border-radius: 4px;
  position: relative;
`;

export const CameraContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  border-radius: 4px;
`;

export const StyledRNCamera = styled(RNCamera)`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const CameraView = styled.View`
  justify-content: center;
  flex: 1;
  width: 100%;
`;

export const StyledTouchableOpacity = styled(TouchableOpacity)`
  align-self: center;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const PendingView = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

export const StyledText = styled.Text`
  font-size: 14px;
`;

export const ChangePicture = styled(TouchableOpacity)`
  position: relative;
  height: 85%;
`;

export const PreviewPicture = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

export const SendButton = styled(TouchableOpacity)`
  background-color: #7d40e7;
  border-radius: 4px;
  margin-top: 15px;
`;

export const SendText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  text-align: center;
`;

export const ChangePictureIcon = styled.View`
  align-items: center;
  elevation: 1;
  height: 100%;
  justify-content: center;
  position: absolute;
  width: 100%;
`;

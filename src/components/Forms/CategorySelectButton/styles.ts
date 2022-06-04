import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

export const Container = styled(TouchableOpacity)`
  background-color: ${({theme}) => theme.colors.shape};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
`;

export const Category = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  padding: 18px 16px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({theme}) => theme.colors.text};
`;

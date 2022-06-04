import React from "react"
import { TouchableOpacityProps, View } from 'react-native'
import { Container, Title } from './styles'
import { RectButtonProps } from 'react-native-gesture-handler'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  onPress: () => void
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { title, onPress, ...rest } = props
  return (
    <Container {...rest} onPress={onPress}>
      <View accessible accessibilityRole="button">
        <Title>{title}</Title>
      </View>
    </Container>
  )
}
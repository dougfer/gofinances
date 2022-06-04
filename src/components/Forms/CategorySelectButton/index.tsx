import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { Category, Container, Icon } from './styles'

interface CategorySelectButtonProps extends TouchableOpacityProps {
  title: string
  onPress: () => void
}

export const CategorySelectButton: React.FC<CategorySelectButtonProps> = (props) => {
  const { title, onPress, ...rest } = props

  return (
    <Container {...rest} onPress={onPress}>
      <Category>{title}</Category>
      <Icon name='chevron-down'/>
    </Container>
  )
}

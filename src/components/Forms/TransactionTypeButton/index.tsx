import React from "react"
import { TouchableOpacityProps } from 'react-native'
import { 
  Container,
  Icon,
  Title,

} from './styles'

interface TransactionTypeButtonProps extends TouchableOpacityProps {
  title: string
  type: 'up' | 'down'
  isActive: boolean
}


export const TransactionTypeButton: React.FC<TransactionTypeButtonProps> = (props) => {
  const { title, type, isActive, ...rest } = props

  const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle'
  }

  return (
    <Container 
      isActive={isActive} 
      type={type}
      {...rest}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  )
}

import React from "react"
import { Container } from './styles'
import { TextInputProps } from 'react-native'

type Props = TextInputProps


export const Input: React.FC<Props> = ({...rest}) => {
  return (
    <Container {...rest} />
  )
}

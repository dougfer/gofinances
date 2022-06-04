import React from 'react'
import { 
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction,
 } from './style'

 interface HighlightCardProps {
   title: string
   amount: string
   lastTransaction: string
   type: 'up' | 'down' | 'total'
 }

export const HighlightCard: React.FC<HighlightCardProps> = (props) => {

  const { amount, lastTransaction, title, type } = props

  const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'
  }

  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>
      <Footer>
        <Amount type={type}>{amount}</Amount>
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  )
}

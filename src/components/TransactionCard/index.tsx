import React from 'react'
import { View } from 'react-native'
import { 
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles'

interface CategoryType {
  name: string
  icon: string
}

export interface TransactionCardProps {
  type: 'positive' | 'negative'
  title: string
  amount: string
  category: CategoryType
  date: string
}

export interface DataProps {
  data: TransactionCardProps
}

export const TransactionCard: React.FC<DataProps> = (props) => {
  const { data: { amount, category, date, title, type } } = props
  return (
    <Container>
      <Title>{title}</Title>
      <Amount type={type}>{type === 'negative' && '- ' }{amount}</Amount>
      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{date}</Date>
      </Footer>
    </Container>
  )
}

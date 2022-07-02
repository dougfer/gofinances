import React, { useEffect, useState } from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import { 
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UseGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton
} from './styles'
import AsyncStorage from "@react-native-async-storage/async-storage";
export interface DataListProps extends TransactionCardProps {
  id: string
}

export const Dashboard: React.FC = () => {

  const [data, setData] = useState<DataListProps[]>([])

  const loadTransactions = async () => {
    const dataKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []


    setData(transactions.map((transaction: DataListProps) => {
      const amount = Number(transaction.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(transaction.date))

      return {
        id: transaction.id,
        title: transaction.title,
        amount,
        type: transaction.type,
        category: transaction.category,
        date
      }
    }))
  }

 
  useEffect(() => {
    loadTransactions()
  }, [])
 
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo 
            source={{ uri: 'https://pbs.twimg.com/media/Ez0y2LXWEAkFslS.jpg' }} 
            />
            <User>
              <UseGreeting>Olá, </UseGreeting>
              <UserName>Douglas</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}} >
            <Icon name='power' />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard type='up' title='Entradas' amount='R$17.400,00' lastTransaction='Última entrada dia 13 de abril' />
        <HighlightCard type='down' title='Saídas' amount='R$1.259,00' lastTransaction='Última saída dia 03 de abril' />
        <HighlightCard type='total' title='Total' amount='R$16.141,00' lastTransaction='01 à 16 de abril' />
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionList 
          data={data}
          renderItem={({item}) => <TransactionCard data={item}/>}
          keyExtractor={(item) => item.id}
        />
      </Transactions>
    </Container>
  )
}

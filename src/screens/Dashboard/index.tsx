import React from "react";
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

export interface DataListProps extends TransactionCardProps {
  id: string
}

export const Dashboard: React.FC = () => {

  const data: DataListProps[] = [
    {
      id: '1',
      title: 'Desenvolvimento de Site',
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: '16/03/2021',
      type: 'positive'
    },
    {
      id: '2',
      title: 'Hamburgueria',
      amount: 'R$ 59,00',
      category: {
        name: 'Alimentação',
        icon: 'coffee'
      },
      date: '10/05/2021',
      type: 'negative'
    },
    {
      id: '3',
      title: 'Aluguel do apartamento',
      amount: 'R$ 1.200,00',
      category: {
        name: 'Casa',
        icon: 'shopping-bag'
      },
      date: '16/03/2021',
      type: 'negative'
    },


  ]
 
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

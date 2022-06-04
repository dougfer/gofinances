import React from 'react'
import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from './styles'
import { FlatList } from 'react-native'
import { categories } from '../../util/categories'
import { Button } from '../../components/Forms/Button'

interface Category {
  key: string
  name: string

}

interface CategorySelectProps {
  category: Category
  setCategory: (category: Category) => void
  closeSelectCategory: () => void
}

export const CategorySelect: React.FC<CategorySelectProps> = (props) => {
  const { category, closeSelectCategory, setCategory } = props
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>
      <FlatList 
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => ( 
        <Category
          onPress={() => setCategory(item)}
          isActive={category.key === item.key}
        >
          <Icon name={item.icon}/>
          <Name>{item.name}</Name>
        </Category>
        )}
      />
      <Footer>
        <Button onPress={closeSelectCategory} title='Selectionar' />
      </Footer>
    </Container>
  )
}
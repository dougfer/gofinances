import React, { useState } from 'react'
import { InputForm } from '../../components/Forms/InputForm'
import { Button } from '../../components/Forms/Button'
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsType
} from './styles'
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton'
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton'
import { CategorySelect } from '../CategorySelect'
import { useForm } from 'react-hook-form'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import { useNavigation } from '@react-navigation/native'

type NavigationProps = {
  navigate:(screen:string) => void;
}

interface FormValues {
  [name: string]: any
}

const schemaValidation = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  amount: yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('Preço é obrigatório'),
})

export const Register: React.FC = () => {
  const [transactionType, setTransactionType] = useState('')
  const [isCategoryModalOpen, setCategoryCategoryModal] = useState(false)
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  const navigation = useNavigation<NavigationProps>()

  const dataKey = '@gofinances:transactions'

  const toggleCategoryModal = () => {
    setCategoryCategoryModal(!isCategoryModalOpen)
  }

  const handleTransactionTypeSelect = (transactionType: 'up' | 'down') => {
    setTransactionType(transactionType)
  }


  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schemaValidation)
  })

  const handleRegister = async (form: FormValues) => {

    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação')
    }

    if(category.key === 'category') {
      return Alert.alert('Selecione a categoria')
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
      date: new Date()
    }

    try {
      const data = await AsyncStorage.getItem(dataKey)

      const currentData = data ? JSON.parse(data) : []

      const dataFormated = [
        ...currentData,
        newTransaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated))
      reset()
      setTransactionType('')
      setCategory({
        key: 'category',
        name: 'Categoria',
      })
      navigation.navigate('Listagem')

    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível salvar')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>
            Cadastro
          </Title>
        </Header>
        <Form>
          <Fields>
            <InputForm 
              name='name'
              placeholder='Nome'
              control={control}
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm 
              name='amount'
              placeholder='Preço'
              control={control}
              keyboardType='numeric'
              error={errors.amount && errors.amount.message}
            />
            <TransactionsType>
              <TransactionTypeButton
                isActive={transactionType === 'up'}
                title='Income'
                type='up'
                onPress={() => handleTransactionTypeSelect('up')}
              />
              <TransactionTypeButton 
                isActive={transactionType === 'down'}
                title='Outcome'
                type='down' 
                onPress={() => handleTransactionTypeSelect('down')}
              />
            </TransactionsType>

            <CategorySelectButton onPress={toggleCategoryModal} title={category.name} />
          </Fields>
          <Button
            title='Enviar' 
            onPress={handleSubmit(handleRegister)}  
          />
        </Form>
        <Modal
          animationType='slide'
          visible={isCategoryModalOpen} 
        >
          <CategorySelect 
            category={category}
            closeSelectCategory={toggleCategoryModal}
            setCategory={setCategory}

          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}

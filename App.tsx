import React from 'react';
import 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'
// import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemeProvider } from 'styled-components'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
import Theme from './src/global/styles/theme'
import { Register } from './src/screens/Register'
import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './src/routes/app.routes'
import { GestureHandlerRootView } from 'react-native-gesture-handler'


export default function App(): JSX.Element {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={Theme} >
        <StatusBar style='light' backgroundColor='#5636D3'  />
          <NavigationContainer>
            <SafeAreaView style={{ flex: 1 }}>
              <AppRoutes />
            </SafeAreaView>
          </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}

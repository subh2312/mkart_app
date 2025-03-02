import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Splash from '@modules/onboard'
import Home from '@modules/home'
import { navigationRef } from './NavigationUtil'
import MainNavigator from './MainNavigator'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="MainNavigator" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
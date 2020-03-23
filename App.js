import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './src/view/home';
import Note from './src/view/note';

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false,}}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Note' component={Note} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator
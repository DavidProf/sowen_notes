import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/view/home';
import Note from './src/view/note';
import Settings from './src/view/settings';

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Note' component={Note} />
        <Stack.Screen name='Settings' component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
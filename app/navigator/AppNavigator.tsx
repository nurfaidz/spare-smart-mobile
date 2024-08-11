import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import SignIn from '../(auth)/sign-in';
import Home from '../index';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="index" component={Home} />
        <Stack.Screen name="(auth)/sign-in" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

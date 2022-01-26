import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Root from './';
import NavigatorSelect from './SearchComponents/NavigatorSelect';
import SearchInput from './SearchComponents/SearchInput';
import SearchRadio from './SearchComponents/SearchRadio';
import SearchAutoInput from './SearchComponents/SearchAutoInput';
import BasicUsage from './SearchComponents/BasicUsage';
import BaseTable from './Utable/BaseTable';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={Root} />
        <Stack.Screen name="NavigatorSelect" component={NavigatorSelect} />
        <Stack.Screen name="SearchInput" component={SearchInput} />
        <Stack.Screen name="SearchAutoInput" component={SearchAutoInput} />
        <Stack.Screen name="SearchRadio" component={SearchRadio} />
        <Stack.Screen name="BasicUsage" component={BasicUsage} />
        {/* 表单 */}
        <Stack.Screen name="BaseTable" component={BaseTable} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

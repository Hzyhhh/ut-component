import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import TopNavigation from '../components/TopNavigation';

export default () => {
  const navigation = useNavigation();

  const handleNavigator = (route: string) => {
    navigation.navigate(route);
  };

  return (
    <>
      <TopNavigation title="Home" subtitle="" accessoryLeft={null} />
      <View style={StyleSheet.flatten([styles.container])}>
        <View style={StyleSheet.flatten([styles.btn])}>
          <Button
            title="组合用法"
            onPress={() => handleNavigator('BasicUsage')}
          />
        </View>
        <View style={StyleSheet.flatten([styles.btn])}>
          <Button
            title="点击事件"
            onPress={() => handleNavigator('NavigatorSelect')}
          />
        </View>
        <View style={StyleSheet.flatten([styles.btn])}>
          <Button
            title="下拉框"
            onPress={() => handleNavigator('SearchAutoInput')}
          />
        </View>
        <View style={StyleSheet.flatten([styles.btn])}>
          <Button
            title="输入框"
            onPress={() => handleNavigator('SearchInput')}
          />
        </View>
        <View style={StyleSheet.flatten([styles.btn])}>
          <Button title="单选" onPress={() => handleNavigator('SearchRadio')} />
        </View>
      </View>

      <View style={StyleSheet.flatten([styles.container])}>
        <View style={StyleSheet.flatten([styles.btn])}>
          <Button
            title="基础表单"
            onPress={() => handleNavigator('BaseTable')}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btn: {
    marginRight: 3,
    marginBottom: 3,
  },
});

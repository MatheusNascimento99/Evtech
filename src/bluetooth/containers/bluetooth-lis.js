import {it} from 'node:test';
import React from 'react';
import {View, Text, FlatList} from 'react-native';

function BluetoothListLayout(props) {
  const lista = [
    {
      name: 'Matheus',
      key: '1',
    },
    {
      name: 'Flávia',
      key: '2',
    },
    {
      name: 'Adriano',
      key: '3',
    },
  ];
  return <FlatList data={lista} renderItem={({item}) => <Text>{item}</Text>} />;
}
export default BluetoothListLayout;

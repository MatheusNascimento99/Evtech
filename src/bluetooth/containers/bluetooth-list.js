import React from 'react';
import {View, Text, FlatList} from 'react-native';
import Layout from '../../components/bluetooth-list-layout';
import Empty from '../../components/empty';
import Toggle from '../../components/toggle';
import Subtitle from '../../components/subtitle';



function BluetoothList(props) {
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

const renderEmpty = () => <Empty text="Não há dispositivos" />


  return(
  <Layout title="Bluetooth">
    <Toggle/>
    <Subtitle title="Lista de Dispositivos"/>
    <FlatList
    ListEmptyComponent={renderEmpty}
      data={lista}
      renderItem={({item}) => <Text style={{fontSize: 20}}>{item.name}</Text>}
      keyExtractor={item => item.key}
    />
  </Layout>
  );
}
export default BluetoothList;

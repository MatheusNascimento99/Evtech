import React from 'react';
import {View, Text, FlatList} from 'react-native';
import Layout from '../../components/bluetooth-list-layout';
import Empty from '../../components/empty';
import Toggle from '../../components/toggle';
import Subtitle from '../../components/subtitle';
import Device from '../../components/device';

function BluetoothList(props) {
  const lista = [
    {
      name: 'Matheus Nascimento',
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
    {
      name: 'A',
      key: '4',
    },
  ];

  const renderEmpty = () => <Empty text="Não há dispositivos" />;
  const renderItem = ({item}) => {
    return <Device {...item} iconLeft={require("../../assets/ble.png")} iconRight={require("../../assets/gear.png")} />
  };


  return (
    <Layout title="Bluetooth">
      <Toggle />
      <Subtitle title="Lista de Dispositivos" />
      <FlatList
        data={lista}
        ListEmptyComponent={renderEmpty}
        renderItem={renderItem}
      />
    </Layout>
  );
}
export default BluetoothList;

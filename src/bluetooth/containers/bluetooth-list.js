import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import Layout from '../../components/bluetooth-list-layout';
import Empty from '../../components/empty';
import Toggle from '../../components/toggle';
import Subtitle from '../../components/subtitle';
import Device from '../../components/device';
import {managerBle} from './actionsBle';
import {error} from 'console';
import {device} from 'react-native-bluetooth-serial-next';

function BluetoothList(props) {
  const [lista, setLista] = useState([]);
  const [bolEnable, setBolenable] = useState(false);

  const renderEmpty = () => <Empty text="Não há dispositivos" />;
  const renderItem = ({item}) => {
    return (
      <Device
        {...item}
        iconLeft={require('../../assets/ble.png')}
        iconRight={require('../../assets/gear.png')}
      />
    );
  };

  //PERMISSION

  useEffect(()=>{
    requestBluetoothPermission = async () => {
      if (Platform.OS === 'ios') {
        return true
      }
      if (Platform.OS === 'android' && PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) {
        const apiLevel = parseInt(Platform.Version.toString(), 10)
    
        if (apiLevel < 31) {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
          return granted === PermissionsAndroid.RESULTS.GRANTED
        }
        if (PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN && PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT) {
          const result = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          ])
    
          return (
            result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
            result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
            result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
          )
        }
      }
    
      this.showErrorToast('Permission have not been granted')
    
      return false
    }
  },[])

  //SCAN DEVICES

  useEffect(() => {
    async function init() {
      await managerBle.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.log('Erro ao scanear dispositivos:', error);
        } else {
          setLista(lista => [...lista, device]);
        }
      });
      console.log('LISTA BLE', lista); 
    }

    init();

    return () => {
      managerBle.stopDeviceScan();
    };
  }, []);

  return (
    <Layout title="Bluetooth">
      <Toggle />
      <Subtitle title="Lista de Dispositivos" />
      <FlatList
        data={lista}
        ListEmptyComponent={renderEmpty}
        renderItem={renderItem}
      />
      {lista}
    </Layout>
  );
}
export default BluetoothList;

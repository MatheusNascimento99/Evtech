import React, {useEffect} from 'react';
import BluetoothList from './src/bluetooth/containers/bluetooth-list';
import {PermissionsAndroid, Text, View} from 'react-native';
import BlClassic from './src/bluetooth/containers/testeBLClassic';

function App(): React.JSX.Element {
  useEffect(() => {
    async function requestBluetoothPermission() {
      try {
        const grantedScan = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          {
            title: 'Bluetooth Scan Permission',
            message:
              'This app needs Bluetooth Scan permission to discover devices.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );

        const grantedConnect = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.LIGAÇÃO_DE_DISTRIBUIÇÃO,
          {
            title: 'Bluetooth Connect Permission',
            message:
              'This app needs Bluetooth Connect permission to connect to devices.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );

        const grantedLocation = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.LOCALIZAÇÃO_DE_ACESSO,
          {
            title: 'Fine Location Permission',
            message: 'This app needs to know location of device.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );

        if (
          grantedScan === PermissionsAndroid.RESULTS.GRANTED &&
          grantedConnect === PermissionsAndroid.RESULTS.GRANTED &&
          grantedLocation === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Bluetooth permissions granted');
          // Vous pouvez maintenant commencer la découverte et la connexion Bluetooth ici.
        } else {
          console.log('Bluetooth permissions denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }, []);

  return (
    <View>
      <Text>Ola Mundo</Text>
    </View>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { PermissionsAndroid } from 'react-native';

function Teste(props) {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    requestBluetoothPermission();
  }, []);

  const requestBluetoothPermission = async () => {
    if (Platform.OS === 'ios') {
      setHasPermission(true);
      return;
    }

    if (Platform.OS === 'android') {
      const apiLevel = parseInt(Platform.Version.toString(), 10);

      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);

        setHasPermission(
          result['android.permission.BLUETOOTH_CONNECT'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.ACCESS_FINE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED,
            console.log(hasPermission)
        );
      }
    }
  };

  if (!hasPermission) {
    return (
      <View>
        <Text>Permissão de Bluetooth não concedida</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Testando </Text>
    </View>
  );
}

export default Teste;
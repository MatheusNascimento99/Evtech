import React, {useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import BleManager from 'react-native-ble-manager';

/* const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule); */

function Teste2(props) {
/*   useEffect(() => {
    BleManager.start({showAlert: false}).then(() => {
      // Success code
      console.log('Module initialized');
    });
  }, []); */


  useEffect(() => {
    BleManager.enableBluetooth()
      .then(() => {
        // Success code
        requestPermission();
        console.log('The bluetooth is already enabled or the user confirm');
      })
      .catch(error => {
        // Failure code
        console.log('The user refuse to enable bluetooth');
      });
  }, []);




  function Scan() {
    BleManager.scan([], 5, true).then(() => {
      // Success code
      console.log('Scan started');
    });
  }


  
  return (
    <View title="Bluetooth">
      <Text>Olaa</Text>
      <TouchableOpacity
        onPress={() => {
          Scan;
        }}>
        <Text>Scanear</Text>
      </TouchableOpacity>
    </View>
  );
}
export default Teste2;

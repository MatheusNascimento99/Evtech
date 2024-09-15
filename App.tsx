import React from 'react';
import BluetoothList from './src/bluetooth/containers/bluetooth-list';
import { Text, View } from 'react-native';

function App(): React.JSX.Element {
  return (
    <View>
      <BluetoothList/>
    </View>
  );
}

export default App;

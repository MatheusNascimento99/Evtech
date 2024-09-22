import React from 'react';
import {
  Button,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Teste21 = () => {
  const requestPermissions = async () => {
    console.log(requestPermissions);
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <Text> Tente as permissões </Text>
      <Button title="Solicitar permissões" onPress={requestPermissions} />
    </View>
  );
};

export default Teste21;

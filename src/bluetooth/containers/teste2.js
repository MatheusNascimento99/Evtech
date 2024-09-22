import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import { requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';

function Teste2(props) {
  const [devices, setDevices] = useState([]);
  const bleManagerEmitter = new NativeEventEmitter(NativeModules.BleManager);

  useEffect(() => {
    // Solicitar permissões no início
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await requestMultiple([
            PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
            PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ]);

          if (
            granted[PERMISSIONS.ANDROID.BLUETOOTH_SCAN] === RESULTS.GRANTED ||
            granted[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT] === RESULTS.GRANTED ||
            granted[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED
          ) {
            console.log('Todas as permissões foram concedidas');
          } else {
            console.log('Permissões negadas');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestPermissions();

    // Inicializa o BleManager
    BleManager.start({ showAlert: false }).then(() => {
      console.log('1 - Módulo inicializado');

      // Função para tratar dispositivos encontrados
      const handleDiscoverPeripheral = (peripheral) => {
        console.log('Dispositivo detectado:', peripheral);

        setDevices((prevDevices) => {
          // Verifica se o dispositivo já está na lista
          if (!prevDevices.find((d) => d.id === peripheral.id)) {
            return [...prevDevices, peripheral];
          }
          return prevDevices;
        });
      };

      // Adiciona o listener para o evento de dispositivos encontrados
      bleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        handleDiscoverPeripheral,
      );
    });

    // Ativa o Bluetooth se necessário
    BleManager.enableBluetooth()
      .then(() => {
        console.log('2 - O Bluetooth já está ativado ou o usuário confirmou.');
      })
      .catch((error) => {
        // Caso o usuário não permita
        console.log('2.1 - O usuário recusou a ativação do Bluetooth.', error);
      });


      bleManagerEmitter.addListener('BleManagerStopScan', () => {
        console.log('Scan finalizado');
      });
      
    // Remove o listener ao desmontar o componente
    return () => {
      bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
    };


  }, []);

  // Função para iniciar o escaneamento de dispositivos
  function Scan() {
    BleManager.scan([], 30, false)
      .then(() => {
        console.log('Scan iniciado');
      })
      .catch((error) => {
        console.error('Erro ao iniciar o scan:', error);
      });
  }

  return (
    <View>
      <Text>Dispositivos Encontrados:</Text>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            {devices}
            {peripheral}
            <Text>{item.name || 'Unnamed Device'}</Text>
            <Text>ID: {item.id}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        onPress={() => {
          Scan();
        }}
      >
        <Text>Scanear</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Teste2;

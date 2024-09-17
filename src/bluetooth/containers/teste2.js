import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import BleManager from 'react-native-ble-manager';

function Teste2(props) {
  const [devices, setDevices] = useState([]);
  const bleManagerEmitter = new NativeEventEmitter(NativeModules.BleManager); // Movido para o escopo superior para acesso em diferentes partes

  useEffect(() => {
    // Inicializa o BleManager
    BleManager.start({showAlert: false}).then(() => {
      console.log('1 - Módulo inicializado');

      // Função para tratar dispositivos encontrados
      const handleDiscoverPeripheral = (peripheral) => {
        setDevices((prevDevices) => {
          // Verifica se o dispositivo já está na lista
          if (!prevDevices.find(d => d.id === peripheral.id)) {
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
        console.log('2.1 - O usuário recusou a ativação do Bluetooth.');
      });

    // Remove o listener ao desmontar o componente
    return () => {
      bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
    };
  }, []);

  // Função para iniciar o escaneamento de dispositivos
  function Scan() {
    BleManager.scan([], 30, true).then(() => {
      console.log('Scan iniciado');
    }).catch(error => {
      console.error('Erro ao iniciar o scan:', error);
    });
  }

  return (
    <View>
      <Text>Dispositivos Encontrados:</Text>
      <FlatList
        data={devices}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View>
            <Text>{item.name || 'Unnamed Device'}</Text>
            <Text>ID: {item.id}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        onPress={() => {
          Scan();
        }}>
        <Text>Scanear</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Teste2;

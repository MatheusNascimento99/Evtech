import React, { useState } from 'react';
import {View, Text, FlatList, Platform} from 'react-native';

import RNBluetoothClassic, {BluetoothDevice,} from 'react-native-bluetooth-classic';

function BlClassic() {
  

const [devices, setDevices] = useState<any[]>([]);
  const [paired, setPaired] = useState<any[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<BluetoothDevice>();
  const [messageToSend, setMessageToSend] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

  // Verificação BL habilitado
const checkBlEnable = async () => {
    try{
        const enable = await RNBluetoothClassic.isBluetoothEnabled();
        if(!enable){
            await RNBluetoothClassic.requestBluetoothEnabled();
        }
    }catch(error){
        console.log(error, "### Dipositivo não disponível");
    }
}

// Verificação para descobrir dispositivos
const startDeviceDiscovrey = async () => {
    console.log("searching for devices...");
    try{
        const paired = await RNBluetoothClassic.getBondedDevices();
        console.log("Bonded peripherals: " + paired.length);
        setPaired(paired);
    }catch(error){
        console.error('Error bonded devices:', error);
    }
}


//Conexão com o dispositivo
const connectToDevice = async (device: BluetoothDevice) => { //device: BluetoothDevice somente em TS
    try{
        console.log("Connecting to device");
        let connection = await device.isConnected();
        if(!connection){
            console.log("Connecting to device");
            await device.connect({
                connectorType: "rfcomm",
          DELIMITER: "\n",
          DEVICE_CHARSET: Platform.OS === "ios" ? 1536 : "utf-8",
            });
        }
        setSelectedDevice(device)
        setIsConnected(true)
        console.log("is connected : ",isConnected);
      device.onDataReceived((data) => this.readData());
      const intervalId = setInterval(() => {readData();}, 100);
      setIntervalId(intervalId);
    }catch(error){
        console.error('Error connecting to device:', error);
    }
}




/* 
caso nao funcione a função nativaonDataReceived

const readData = async () => {  
  if (selectedDevice && isConnected) {
    try {
        let message = await selectedDevice.read();
        if(message){
          message = message.trim();
          if (message !== "" && message !== " "){
            if(receivedMessage.length>300){
              setReceivedMessage("");
            }
            setReceivedMessage(receivedMessage => receivedMessage + message +"\n" );
          }
        }
    } catch (error) {
      console.error('Error reading message:', error);
    }
  }
}

*/


useEffect(() => {
    let intervalId: string | number | NodeJS.Timer | undefined;
    if (selectedDevice && isConnected) {
      intervalId = setInterval(() => readData(), 100);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isConnected,selectedDevice]);
  const disconnect = () => {
    //need to reset esp32 at disconnect
    if(selectedDevice && isConnected){
      try {
        clearInterval(intervalId);
        setIntervalId(undefined);
        
        selectedDevice.clear().then( () => {
          console.log("BT buffer cleared");
        });
        selectedDevice.disconnect().then( () => {
          setSelectedDevice(undefined);
          setIsConnected(false);
          setReceivedMessage("");
          console.log("Disconnected from device");
        });
      } catch (error) {
        console.error('Error disconnecting:', error);
      }
    }
  }


  const sendMessage = async () => {
    if(selectedDevice && isConnected){
      console.log("isConnected in message",isConnected);
      try {
        await selectedDevice.write(messageToSend);
        
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  }

  return (
    <View>
      <Text>BL classico</Text>
    </View>
  );
}
export default BlClassic;

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

function Device(props) {
  return (
    <TouchableOpacity style={style.wrapper}>
      <View style={style.wrapperLeft}>
        <Image style={style.iconLeft} />
      </View>
      <View style={style.wrapperName}>
        <Text style={style.name}></Text>
      </View>
      <Image style={style.iconRight}/>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  wrapper: {
    paddingVertical: 15,
    flexDirection: 'row',
  },
  wrapperLeft: {
    fontSize: 20,
    flex: 1,
    fontWeight: 'bold',
  },
  swiiconLefttch: {
    width: 50,
  },
  wrapperName: {
    width: 50,
  },
  name: {
    width: 50,
  },
  swiiconLeficonRightttch: {
    width: 50,
  },
});

export default Device;

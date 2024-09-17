import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Divisor from '../components/divisor';

function Device(props) {
  return (
    <>
      <TouchableOpacity style={style.wrapper} onPress={props.onPress}>
        <View style={style.wrapperLeft}>
          <Image style={style.iconLeft} source={props.iconLeft} />
        </View>
        <View style={style.wrapperName}>
          <Text style={style.name}>{props.name}</Text>
        </View>
        <Image style={style.iconRight} source={props.iconRight} />
      </TouchableOpacity>
      <Divisor />
    </>
  );
}

const style = StyleSheet.create({
  wrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  wrapperLeft: {
    width: 60,
    height: 60,
    borderRadius: 60,
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  iconLeft: {
    width: 50,
    height: 50,
  },
  wrapperName: {
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: 15,
  },
  name: {
    fontWeight: '800',
    fontSize: 16,
  },
  iconRight: {
    width: 30,
    height: 30,
    marginLeft: 3,
  },
});

export default Device;

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

function Device(props) {
  return (
    <TouchableOpacity style={style.wrapper} onPress={props.onPress}>
      <View style={style.wrapperLeft}>
        <Image style={style.iconLeft} source={props.iconLeft} />
      </View>
      <View style={style.wrapperName}>
        <Text style={style.name}>{props.name}</Text>
      </View>
      <Image style={style.iconRight} source={props.iconRight}/>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  wrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems  :"center",
    justifyContent:"space-between",
    padding:10

  },
  wrapperLeft: {
    width:40,
    height:40,
    borderRadius:20,
    borderColor:"gray",
    borderWidth:1,
    alignItems  :"center",
    flexDirection: 'column',
    justifyContent:"center",
  },
  swiiconLefttch: {
    width:20,
    height:20,
  },
  wrapperName: {
    flex:1,
    justifyContent:"flex-start",
    marginLeft:15,
  },
  name: {
    width: 50,
  },
  swiiconLeficonRightttch: {
    width: 50,
  },
});

export default Device;

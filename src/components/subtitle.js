import React from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';

function Subtitle(props) {
  return (
    <View style={style.container}>
      <Text style={style.title}>{props.title}</Text>
      <View style={style.line} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection:"row",
    marginVertical:15,
    alignItems:"center"
  },
  title: {
    fontSize: 16,
    color:"gray",
    fontWeight:"bold",
  },
  line: {
    width:50,
    borderBottomWidth:1,
    marginLeft:5,
    marginTop:3,
    flex:1,
    borderColor:"#eceff1"
  },
});

export default Subtitle;

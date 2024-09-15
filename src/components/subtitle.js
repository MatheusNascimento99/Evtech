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
    paddingVertical:15,
    flexDirection:"row",
  },
  text: {
    fontSize: 20,
    flex:1,
    fontWeight:"bold",
  },
  line: {
    width:50
  },
});

export default Subtitle;

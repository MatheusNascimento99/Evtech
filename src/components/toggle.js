import React from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';

function Toggle(props) {
  return (
    <View style={style.container}>
      <Text style={style.text}>ON</Text>
      <Switch
        style={style.switch}
        value={props.value}
        onValueChange={props.onValueChange}
      />
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
  switch: {
    width:50
  },
});

export default Toggle;

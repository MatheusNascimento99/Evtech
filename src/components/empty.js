import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {styleText} from 'util';

function Empty(props) {
  return (
    <View>
      <Text style={style.text}>{props.text}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});

export default Empty;
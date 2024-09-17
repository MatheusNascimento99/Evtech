import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

function Divisor(props) {
  return (
        <View style={[style.divisor,
            {
                borderColor: props.color? props.color:"#7fbce5"
            }
        ]}>
    </View>
  );
}

const style = StyleSheet.create({
    divisor:{
        flex:1,
        borderTopWidth:1,
        marginLeft:85,
        marginRight:12,
        borderColor:"#7fbce1",
    },
});

export default Divisor;

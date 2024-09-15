import React from "react";
import {View, Text, StyleSheet} from 'react-native';

function BluetoothListLayout(props){
    return(
        <View style={style.container}>
            <Text style={style.title}>
                {props.title}
            </Text>
            {props.children}
        </View>
    )
}

const style= StyleSheet.create({
    container:{
    paddingHorizontal:20,
    paddingVertical:25,
    backgroundColor:"#f5fcff"
    },
    title:{
        fontSize:18,
        fontWeight:"bold",
    },
});

export default BluetoothListLayout;
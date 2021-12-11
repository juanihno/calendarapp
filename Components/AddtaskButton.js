import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from "react-native";
export function AddtaskButton( props ) {
    const gotoAddtasks = () => {
        {navigation.navigate("AddTask")}
        
        }
        const handlePress = () => {

        }
  return(
    <TouchableOpacity onPress={() => props.handler() }>
      <Text style={styles.signoutText}>Todo List</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  signoutText: {
    color:'#3E3364'

  },
})
  
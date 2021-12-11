import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native'

export function Splash(props) {
  const navigation = useNavigation()

  useEffect(() => {
    const timer = setTimeout(() => navigation.navigate('Signup'), 3000)
  })

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.loadingText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3E3364',
    minHeight: 150,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textShadowOffset: { width: 2, height: 2 },
      textShadowRadius : 5

 },
})
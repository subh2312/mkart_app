import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Image } from 'react-native'
import { Colors, screenHeight, screenWidth } from '@utils/Constants'
import { resetAndNavigate } from '@navigation/NavigationUtil'

const Splash = () => {

  useEffect(() => {
    const timeOut = setTimeout(() => {
      resetAndNavigate('MainNavigator')
    }, 3000)
    return () => clearTimeout(timeOut)
  }, [])

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('@assets/images/logo_t.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary
  },
  image: {
    width: screenWidth * 0.35,
    height: screenHeight * 0.35,
    resizeMode: 'contain'
  }
});

export default Splash
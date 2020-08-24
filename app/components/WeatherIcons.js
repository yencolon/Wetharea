import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const WeatherIcons = ({ icon1, icon2, fontIconSize }) => {

  if(icon2 === '') {
    return (
      <View style={[styles.container]}>
        <Text style={{fontSize: fontIconSize}}>{icon1}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.icons1}>{icon1}</Text>
      <Text style={styles.icons2}>{icon2}</Text>
    </View>
  )
}

export default WeatherIcons

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    maxWidth: 72
  },
  icons1: {
    fontSize: 22,
    marginTop: -2,
    marginLeft: 8,
  },
  icons2: {
    fontSize: 30,
    marginLeft: -18
  },
})

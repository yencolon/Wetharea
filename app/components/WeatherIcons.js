import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const WeatherIcons = ({ icon1, icon2, fontIconSize, isCurrent }) => {

  if(isCurrent){
    if(icon2 === '') {
      return (
        <View style={styles.currentContainer}>
          <Text style={{fontSize: fontIconSize}}>{icon1}</Text>
        </View>
      )
    }
  
    return (
      <View style={styles.currentContainer}>
        <Text style={styles.currentIcons1}>{icon1}</Text>
        <Text style={styles.currentIcons2}>{icon2}</Text>
      </View>
    )
  }
  
  if(icon2 === '') {
    return (
      <View style={styles.container}>
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
  currentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  icons1: {
    fontSize: 22,
    marginTop: -2,
    marginLeft: 8,
  },
  icons2: {
    fontSize: 30,
    marginLeft: -25
  },
  currentIcons1: {
    fontSize: 52,
    marginTop: -2,
    marginLeft: 8,
  },
  currentIcons2: {
    fontSize: 60,
    marginLeft: -50
  },
})

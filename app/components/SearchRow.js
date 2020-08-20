import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default function SearchRow({place, address, latitude, longitude, onPress}) {
    if(address === undefined) return <View></View>;
    return (
        <TouchableOpacity onPress={() => onPress(latitude, longitude)} style={styles.container}>
            <Text style={styles.cityText}>{address.village || address.city || address.town || place}</Text>
            <Text style={styles.infoCityText}>{address.state + ', '  + address.country}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 6,
        paddingHorizontal: 20
    },
    cityText: {
        color: 'whitesmoke',
        fontSize: 20,
    },
    infoCityText: {
        color: 'darkgray',
        fontSize: 18,
    }
    
})

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

function CurrentWeatherCard({ weather, temp, feelsLike, date, place }) {
    return (
        <View style={styles.container}>
            {/* <Image source=''/> */}
            <Text style={styles.dateStyle}>{getDate(date)}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.weatherIcon}>☀</Text>
                <View>
                    <Text style={styles.tempText}>{temp}°</Text>
                    <Text style={{ color: '#fff' }}>Feels like {feelsLike}° </Text>
                    <Text style={{ color: '#fff' }}>{place}</Text>
                    <Text style={{ color: '#fff' }}>{weather}</Text>
                </View>
            </View>
        </View>
    )
}

export default CurrentWeatherCard;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginHorizontal: 10
    },
    tempText: {
        fontSize: 60,
        color: 'white'
    },
    weatherIcon: {
        fontSize: 60,
    },
    dateStyle: {
        fontSize: 15,
        color: '#fff'
    }
})


const getWeatherIcon = (weather) => {
    switch (weather) {
        case 'sunny':
            return '☀';
        default: return '☁';
    }
}

const getDate = (date) => {
    return (
        [
            "Domingo",
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Sábado",
        ][date.getDay()] + date.getDate()
    );
}
import React, { Fragment } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { getHoursToday, getUVIndex } from '../utils/utils';

function RowDetail({ title, icon, value }) {
    return (
        <View style={styles.rowContainer}>
            <Text style={styles.text}>
                {icon + ' ' + title}
            </Text>
            <Text style={styles.text}>
                {value}
            </Text>
        </View>
    )
}
export default function WeatherDetails({ sunriseTime, sunsetTime, pressure, uvi, humidity, wind_speed, isLoading }) {
    return (
        <View style={styles.container}>
            {
                isLoading ? <ActivityIndicator /> :
                    <Fragment>
                        <RowDetail title='Atardecer' value={getHoursToday(sunsetTime)} icon='🌇' />
                        <RowDetail title='Amanecer' value={getHoursToday(sunriseTime)} icon='🌅' />
                        <RowDetail title='Humedad' value={humidity + '%'} icon='💧' />
                        <RowDetail title='Presion' value={pressure + ' atm'} icon='🌡' />
                        <RowDetail title='Indice UV' value={getUVIndex(uvi)} icon='🔅' />
                        <RowDetail title='Velocidad del viento' value={wind_speed + ' km/h'} icon='💨' />
                    </Fragment>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.22)',
        padding: 10,
        borderRadius: 20,
        marginHorizontal: 10,
        marginVertical: 10
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 0.5,
        paddingVertical: 5,
        paddingHorizontal: 8,
    },
    text: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "500",
    },
});

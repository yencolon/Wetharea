import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Location from "expo-location";

import { searchLoaction } from '../api/index'
import SearchRow from '../components/SearchRow';
const Separator = () => <View style={styles.separator} />;

export default function SearchLocation({ navigation, onLocationSelected }) {

    const [search, setSearch] = useState('');
    const [places, setPlaces] = useState([])
    
    useEffect(() => {
        const searchApi = async () => {
            try {
                const placesApi = await searchLoaction.getPlaces(search)
                const filterPlaces = await placesApi.json()
                setPlaces(filterPlaces.filter(pl => pl.address.state !== undefined))
            } catch (error) {
                console.log(error + ' error al tratar de buscar lugares')
            }
        }
        searchApi()
        return () => {

        }
    }, [search])

    const setLocation = (latitude, longitude) => {
        onLocationSelected(latitude, longitude)
    }

    const renderItem = ({ item }) => <SearchRow place={item.display_name} address={item.address} latitude={item.lat} longitude={item.lon} onPress={setLocation} />;

    return (
        <View style={styles.container}>
            <View style={styles.input}>
                <AntDesign name="search1" size={20} color="gray" />
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={text => setSearch(text)}
                    value={search}
                    underlineColorAndroid="transparent"
                    placeholder="Buscar (Ej. pais, estado, ciudad, calle, codigo postal)"
                />
            </View>
            <FlatList
                data={places}
                renderItem={renderItem}
                ItemSeparatorComponent={Separator}
                keyExtractor={(item) => item.place_id + ''}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        paddingTop: 50, 
        flex: 1, 
        backgroundColor: 'whitesmoke'},
    input: {
        backgroundColor: 'white',
        flexDirection: 'row', 
        marginHorizontal: 10,
        padding: 8,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 10
    },
    textInputStyle: {
        flex: 1,
        paddingLeft: 5
    },
    separator: {
        backgroundColor: "rgba(0,0,0,0.22)",
        height: .5,
    }
})

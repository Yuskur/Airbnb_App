import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'

function ResortScreen({
    imagePath, title, ratings, type, price
}){
    return(
        <View>
            <Image 
                source={imagePath}
                style={styles.resortImage}
            />
            <Text style={{
                fontWeight: 'bold',
                fontSize: 24,
                marginHorizontal: 30
            }}>
                {title}
            </Text>
        </View>
    );
}

export default function Resort({ route }){

    const { imagePath, title, ratings, type, price } = route.params;

    return(
        <View style={{flex: 1}}>
            <ScrollView>
                <ResortScreen
                    imagePath={imagePath}
                    title={title}
                    ratings={ratings}
                    type={type}
                    price={price}
                />
            </ScrollView>
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 25,
                    marginHorizontal: 15}}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: 'bold'
                    }}>{price}</Text>
                    <Text style={{fontSize: 15}}> night</Text>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={{
                        color: '#FFF', 
                        fontSize: 17,
                        fontWeight: 'bold',
                        alignSelf: 'center'}}>Reserve</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        bottom: 0, height: 100, 
        borderWidth: 1, 
        borderColor: 'grey',
        position: 'absolute',
        justifyContent: 'space-between',
        width: '100%',
    }, 
    resortImage: {
        width: '100%',
        height: 330
    },
    button: {
        backgroundColor: 'hsl(0, 83%, 60%)',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        height: 60,
        alignSelf: 'center',
        marginRight: 10
    }
})
import { View, Text, StyleSheet, Image, TextInput, KeyboardAvoidingView, ScrollView} from 'react-native'
import React from 'react'

function SearchBar(){
    return(
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.searchBarContainer}>
                <Image 
                    source={require('../../../assets/searchIcon.png')}
                    style={styles.searchBarImage}
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Search'
                    placeholderTextColor='black'
                />
                </View>
                <View style={styles.circle}>
                    {/* Add some kind of image here: */}

                </View>
        </View>
    );
}

function Resort({imagePath, title, type, ratings, price}){
    return( 
        <View style={styles.resortContainer}>
        <Image 
            source={imagePath}
            style={styles.resortImage}
        />
        <Image />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.resortText}>{title}</Text>
            <Text style={styles.resortText}>{ratings}</Text>
        </View>
        <Text>{type}</Text>
        <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>{price}</Text>
            <Text> night</Text>
        </View>
    </View>
    );
}

export default function Explore(){
    return(
        <ScrollView style={styles.container}>
            <SearchBar />
            <Resort 
            imagePath={require('../../../assets/resort1.jpeg')}
            title="Resort with big terrace & private bath"
            type="Private room"
            ratings="4.5"
            price="$45" />
            <Resort 
            imagePath={require('../../../assets/resort2.jpeg')}
            title="Resort with big terrace & private bath"
            type="Private room"
            ratings="4.5"
            price="$45" />
            <View style={{flexDirection: 'row'}}>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    searchBarContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        width: 275,
        height: 60,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 150,
    },
    searchBarImage: {
        width: 30,
        height: 30,
        alignSelf: 'center',
        marginLeft: 10,
    },
    resortContainer: {
        marginTop: 30
    },  
    resortImage: {
        width: '100%',
        height: 300,
        borderRadius: 20,
    },
    container: {
        marginHorizontal: 15,

    },
    circle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#FFF',
        marginLeft: 20,
    },
    input: {
        flex: 1,
        height: '100%',
        marginLeft: 10,
    },
    resortText: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: 'bold'
    }
});
import { View, Text, StyleSheet, Image, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

function SearchBar(){
    return(
        <View style={{
            flexDirection: 'row', 
            justifyContent: 'space-between',
            marginBottom: 20}}>
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

    const navigation = useNavigation();

    function imageClick(){
        navigation.navigate('Resort', {
            imagePath,
            title,
            type,
            ratings,
            price,
        });
    };


    return( 
        <View style={styles.resortContainer}>
        <TouchableOpacity onPress={imageClick}>
            <Image 
                source={imagePath}
                style={styles.resortImage}
            />
        <Image />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={imageClick}>
                <Text style={styles.resortText}>{title}</Text>
            </TouchableOpacity>
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
        <View>
            <ScrollView style={styles.container}>
            <SearchBar />
            <Resort 
            imagePath={require('../../../assets/resort1.jpeg')}
            title="Resort with big terrace & private bath"
            type="Private room"
            ratings="4.5"
            price="$150" />
            <Resort 
            imagePath={require('../../../assets/resort2.jpeg')}
            title="Resort with big terrace & private bath"
            type="Private room"
            ratings="4.5"
            price="$550" />
            </ScrollView>
            <TouchableOpacity style={{
                position: 'absolute', 
                alignItems: 'center',
                bottom: 50,
                width: '100%',
                borderRadius: 100,
                height: 60,
                }}>
                <View style={{
                    flexDirection: 'row', 
                    backgroundColor: 'grey',
                    borderRadius: 60,
                    padding: 15,
                    alignItems: 'center'
                    }}>
                    <Text style={{fontWeight: 'bold', color: '#FFF'}}>Maps</Text>
                    <Image 
                        source={require('../../../assets/mapIcon.png')}
                        style={styles.searchBarImage}
                    />
                </View>
            </TouchableOpacity>
        </View>
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
        marginTop: 30,
        marginBottom: 20
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
        marginRight: 20
    },
    resortText: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: 'bold'
    }
});
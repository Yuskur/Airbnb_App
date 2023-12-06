import { View, Text, StyleSheet, Image, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';

function SearchBar(){
    return(
        <View>
            <View style={{
                flexDirection: 'row', 
                justifyContent: 'space-between',
                marginBottom: 20, marginTop: 10}}>
                <View style={styles.searchBarContainer}>
                    <Image 
                        source={require('../../../assets/searchIcon.png')}
                        style={styles.searchBarImage}
                    />
                    <Image />
                    <TextInput 
                        style={styles.input}
                        placeholder='Search'
                        placeholderTextColor='black'
                    />
                    </View>
                    <View style={styles.circle}>
                    <Image 
                        style={{width: '100%', height: '100%', borderRadius: 30}}
                        source={require('../../../assets/filterIcon.png')}
                    />
                </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity>
                    <View>
                        <Image source={require('../../../assets/cabinsIcon.png')}
                            style={{width: 40, height: 40}}
                        />
                        <Text style={{alignSelf: 'center'}}>Cabins</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View>
                        <Image source={require('../../../assets/trendingIcon.png')}
                            style={{width: 40, height: 40}}
                        />
                        <Text style={{alignSelf: 'center'}}>Trending</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View>
                        <Image source={require('../../../assets/gameControllerIcon.png')}
                            style={{width: 40, height: 40}}
                        />
                        <Text style={{alignSelf: 'center'}}>Play</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View>
                        <Image source={require('../../../assets/cityIcon.png')}
                            style={{width: 40, height: 40}}
                        />
                        <Text style={{alignSelf: 'center'}}>City</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View>
                        <Image source={require('../../../assets/beachIcon.png')}
                            style={{width: 40, height: 40}}
                        />
                        <Text style={{alignSelf: 'center'}}>Beach</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function Resort({imagePath, title, type, ratings, price}){

    const navigation = useNavigation();
    const [hearted, setHearted] = useState(false)

    function imageClick(){
        navigation.navigate('Resort', {
            imagePath,
            title,
            type,
            ratings,
            price,
        });
    };

    function heart(){
        if(hearted){
            setHearted(false);
        }else {
            setHearted(true);
        }
    };


    return( 
        <View style={styles.resortContainer}>
        <TouchableOpacity onPress={imageClick}>
            <Image 
                source={imagePath}
                style={styles.resortImage}
            />
        </TouchableOpacity>
        <View style={styles.heartImage}>
        {hearted ? (
            <>
            <TouchableOpacity onPress={heart}>
                <Image 
                source={require('../../../assets/heartedIcon.png')}
                style={{height: 20, width: 20}}/>
            </TouchableOpacity>
            </>
        ) : (
            <>
            <TouchableOpacity onPress={heart}>
                <Image 
                source={require('../../../assets/heartIcon.png')}
                style={{height: 20, width: 20}}/>
            </TouchableOpacity>
            </>
        )}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={imageClick}>
                <Text style={styles.resortText}>{title}</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>  
                <Image source={require('../../../assets/blackStarIcon.png')} 
                    style={{width: 20, height: 20, marginTop: 10, alignSelf: 'center'}}
                />
                <Text style={styles.resortText}>{ratings}</Text>
            </View> 
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
    },
    heartImage: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 10,
        right: 10
    }
});
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebaseConfig';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

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
            <Text style={{fontWeight: 'bold', fontSize: 15, marginHorizontal: 30, marginTop: 10}}>
                This is a two man bedroom with a room, bathroom and everything
            </Text>
            <Text style={{fontSize: 15, color: 'grey', marginHorizontal: 30, marginTop: 10}}>
                1 guests . 1 bedroom . 2 beds . 1 bathrooms
            </Text>
            <View style={{flexDirection: 'row', marginHorizontal: 30, marginTop: 10}}>
                <Image source={require('../../../assets/blackStarIcon.png')} 
                    style={{width: 20, height: 20}}
                />
                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                    {ratings} - 21 reviews
                </Text>
            </View>
            <View style={{flex: 1, marginHorizontal: 30}}>
                <View style={{borderWidth: .5, borderColor: 'grey', marginTop: 10, marginBottom: 10}}/>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{
                        borderRadius: 120, 
                        width: 60, height: 60, 
                        borderColor: 'black',
                        borderWidth: 1,
                        backgroundColor: 'grey'}}  
                    />
                    <View>
                        <Text style={{marginLeft: 20, fontSize: 15, fontWeight: 'bold', marginBottom: 5}}>
                            Hosted by Sherkan
                        </Text>
                        <Text style={{marginLeft: 20, fontSize: 12, fontWeight: 'bold'}}>
                            Hosted since 2017 - 07 - 07
                        </Text>
                    </View>
                </View>
                <View style={{borderWidth: .5, borderColor: 'grey', marginTop: 10, marginBottom: 10}}/>
                <Text style={{marginBottom: 130, fontSize: 15, fontWeight: '500'}}>
                Discover unparalleled luxury at our exclusive resort featuring a two-bedroom 
                haven and a lavish bathroom. Indulge in the opulence of modern design, plush 
                furnishings, and a tranquil ambiance in each carefully curated bedroom. 
                The bathroom is a sanctuary of relaxation, equipped with top-tier fixtures 
                and amenities for the ultimate pampering experience. Rumored to have hosted 
                the iconic rapper Kanye West, our resort adds a touch of celebrity allure to
                your stay. Immerse yourself in a world where luxury meets exclusivity, promising
                an unforgettable escape for those seeking a refined and star-studded retreat.
                </Text>
            </View>
        </View>
    );
}

export default function Resort({ route }){

    const { imagePath, title, ratings, type, price } = route.params;

    const [reserved, setReserved] = useState(false);
    const [user, setUser] = useState(false);
    const auth = FIREBASE_AUTH;

    useEffect(() => {
        setReserved(false);
      }, []);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if(user){
            setUser(user);
        } 
        else {
            setUser(user);
            setReserved(false);
        }
    });

    async function addResort(){
        if(user){
            data ={
                _imagePath: imagePath,
                _title: title,
                _ratings: ratings, 
                _type: type,
                _price: price
            };
            try{
                const userCollection = collection(FIREBASE_DB, "users");
                const userDocRef = doc(userCollection, user.uid);
                const userResorts = collection(userDocRef, "Resorts");
                await addDoc(userResorts, data);

                setReserved(true);  
                
                console.log("Success!");
            } catch(error){
                console.log("Could not add reservation" + error.message);
            }
        } else{
            // No user is signed in.
            console.log("No user signed in");
        }
    }

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
                {reserved ? (
                    <>
                        <View style={styles.reservedButton}>
                            <Text style={{
                            color: '#FFF', 
                            fontSize: 17,
                            fontWeight: 'bold',
                            alignSelf: 'center'}}>Reserved </Text>
                            <Image source={require('../../../assets/checkIcon.png')} 
                                style={{width: 20, height: 20}}
                            />
                        </View>
                    </>
                ) : (
                    <>
                        <TouchableOpacity style={styles.button} onPress={addResort}>
                            <Text style={{
                            color: '#FFF', 
                            fontSize: 17,
                            fontWeight: 'bold',
                            alignSelf: 'center'}}>Reserve</Text>
                        </TouchableOpacity>
                    </>
                )}
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
        backgroundColor: '#fff'
    }, 
    resortImage: {
        width: '100%',
        height: 330, 
        marginBottom: 10
    },
    button: {
        backgroundColor: 'hsl(0, 83%, 60%)',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        height: 60,
        alignSelf: 'center',
        marginRight: 10
    }, 
    reservedButton: {
        flexDirection: 'row',
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        height: 60,
        alignSelf: 'center',
        marginRight: 10
    }
})
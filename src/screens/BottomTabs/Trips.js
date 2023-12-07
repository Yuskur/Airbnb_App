import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebaseConfig';
import { addDoc, collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const auth = FIREBASE_AUTH;
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
            <Text style={{
                fontWeight: '900', 
                alignSelf: 'center',
                fontSize: 15,
                marginBottom: 10}}>trips</Text>
            <Text style={{fontWeight: 'bold', fontSize: 24, marginBottom: 30}}>
                Upcoming Reservations
            </Text>
            <View>
                <Image 
                    source={imagePath}
                    style={styles.resortImage}
                />
                <View style={{
                    flex: 1, 
                    height: 30,
                    position: 'absolute',
                    top: 20,
                    left: 10,
                    backgroundColor: '#fff',
                    borderRadius: 5}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, margin: 5}}>
                            In 2 days
                        </Text>
                    </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.resortText}>{title}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>   
                    <Image source={require('../../../assets/blackStarIcon.png')}
                        style={{width: 20, height: 20, marginTop: 10}}
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

function ResortView({ resort }){
    return (
        <Resort 
        imagePath={resort._imagePath} 
        title={resort._title} 
        type={resort._type}
        price={resort._price}
        ratings={resort._ratings} />
    )
}

export default function Trips(){

    const [resorts, setResorts] = useState([]);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                try{
                    const resortsCollection = collection(doc(FIREBASE_DB, "users", user.uid), "Resorts");
                    const subscriber = onSnapshot(resortsCollection, (snapshot) => {
                        const resortData = snapshot.docs.map((resorts) => {
                            return { id: resorts.id, ...resorts.data() };
                        });

                        setResorts(resortData)
                    });
                    return () => subscriber();
                } catch(error){
                    console.log("Error getting the users: ");
                }
            } 
            else {
                console.log("No user signed in");
                setResorts([]);
            }
        });
        return () => unsubscribe();
    }, []);

    return(
        <ScrollView>
           {resorts.map((resort) => (
                <ResortView key={resort.id} resort={resort} />
           ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    resortContainer: {
        marginTop: 100,
        marginBottom: 20,
        marginHorizontal: 25
    },  
    resortImage: {
        width: '100%',
        height: 300,
        borderRadius: 20,
    },
    resortText: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: 'bold'
    },
});
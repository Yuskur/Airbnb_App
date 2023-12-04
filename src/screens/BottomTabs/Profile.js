import { View, Text, Button, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

function Authentication(){
    const [user, setUser] = useState(null);
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState("Name place holder");
    const [email, setEmail] = useState("email");
    const [startDate, setDate] = useState("since");

    const navigation = useNavigation();
    const toLogin = () => {
        navigation.navigate('LoginScreen');
    };

    function clickOn(){
        setEdit(true)
    }
    function clickOff(){
        setEdit(false)
    }

    useEffect(() => {
        const auth = FIREBASE_AUTH;

        const check = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if(user == null){
                setName("Name Place holder");
                setEmail("email")
                setDate("since")
            } else{
                setName(user.displayName);
                setEmail(user.email);
                setDate(user.metadata.creationTime);
            }
        });

        //stops listening when the component is no longer active
        return () => check();
    }, []);

    return(
        <View style={{flex: 1, marginHorizontal: 20}}>
            {user ? (
                <>
                <View style={{
                        flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{
                            width: '100%',
                            height: 300,
                            borderColor: 'black',
                            borderWidth: 1,
                            borderRadius: 20
                        }}>
                        <View style={styles.profilePicture}>
                            <Image 
                                source={require('../../../assets/default_profile_pic.jpeg')}
                                style={{width: '100%', height: '100%'}}
                            />
                        </View>
                            {edit ? (
                                <>
                                <View style={{
                                    marginHorizontal: 10,
                                    alignSelf: 'center',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <TextInput 
                                        style={styles.input}
                                        value={name}
                                        onChangeText={(name) => setName(name)}
                                    />
                                    <TouchableOpacity onPress={clickOff} >
                                        <Image 
                                            source={require('../../../assets/checkIcon.png')}
                                            style={{height: 20, 
                                            width: 20,
                                            marginLeft: 10}}
                                        />
                                    </TouchableOpacity>
                                </View>
                                </>
                            ) : (
                                <>
                                <View style={{
                                    marginHorizontal: 10,
                                    alignSelf: 'center',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    }}>
                                    <Text style={styles.input}>
                                        {name}
                                    </Text>
                                    <TouchableOpacity onPress={clickOn}>
                                        <Image 
                                            source={require('../../../assets/editBoxIcon.png')}
                                            style={{
                                                height: 20, 
                                                width: 20,
                                                marginLeft: 10}}
                                        />
                                    </TouchableOpacity>
                                </View>
                                </>
                            )}
                            <Text style={{
                                alignSelf: 'center',
                                textDecorationLine: 'underline'
                            }}>email
                            </Text>
                            <Text style={{
                                alignSelf: 'center',
                                marginTop: 10,
                                fontWeight: 'bold'
                            }}>since </Text>
                        </View>
                    </View>
                </>
            ) : (
                <>
                <TouchableOpacity onPress={toLogin}>
                    <Text style={styles.loginText}>Log In</Text>
                </TouchableOpacity>
                </>
            )}
        </View>
    );
};

export default function Profile(){

    return(
        <Authentication />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        marginVertical: 10,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: "#fff",
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 40
    },
    profilePicture: {
        borderRadius: 90,
        borderWidth: 1,
        borderColor: 'black',
        height: 120,
        width: 120,
        alignSelf: 'center',
        marginTop: 20, 
        marginBottom: 20
    }

})
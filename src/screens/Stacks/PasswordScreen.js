import { View, Text, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, doc } from 'firebase/firestore';


function PasswordEnter({ email }){
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const navigation = useNavigation();

    console.log(email);

    const signIn = async () => {
        if(password != ""){
            setLoading(true);
            try{
                const response = await signInWithEmailAndPassword(auth, email, password);
                console.log(response);
                
                navigation.navigate('Tabs');

            } catch (error){
                console.error(error);
                alert("Sign In failed: " + error.message);
            } finally {
                setLoading(false);
            }
        }
    }

    const signUp = async () => {
        if(password != ""){
            setLoading(true);
            try{
                const response = await createUserWithEmailAndPassword(auth, email, password);
                const user = response.user;
                const addUser = await addDoc(collection(FIREBASE_DB, "users", user.uid), {
                    userName: user.displayName, 
                    imagePath: "",
                    title: "",
                    type: "",
                    ratings: "",
                    price: "",
                });
                console.log(addUser);
                signIn();
            } catch(error){
                console.error(error);
                alert("Sign Up failed: " + error.message);
                setLoading(false);
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                borderBottomWidth: 2,
                borderBottomColor: 'black',
                marginBottom: 30
            }}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 30
                }}> Password </Text>
            </View>
            <KeyboardAvoidingView behavior='padding'>
                <TextInput 
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                {loading ? (
                    <ActivityIndicator size="large" />
                ): (
                    <>
                        <TouchableOpacity onPress={signUp} style={styles.button}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold'}}>
                            ------------------------------ or 
                            ------------------------------
                        </Text>
                        <TouchableOpacity onPress={signIn} style={styles.button}>
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>
                    </>
                )}
            </KeyboardAvoidingView>
        </View>
    );
}


export default function PasswordScreen({ route }){

    const { email } = route.params
    
    const userEmail = email.substring((email.indexOf(":") + 1), email.length);

    return(
        <PasswordEnter email={userEmail}/>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 100,
        flex: 1,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '900',
    },
    button: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: 'hsl(0, 83%, 60%)',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    input: {
        marginVertical: 10,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: "#fff",
    },
  });
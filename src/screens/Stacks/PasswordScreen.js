import { View, Text, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';


function PasswordEnter({ email }){
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const navigation = useNavigation();

    const signIn = async () => {
        if(password != ""){
            setLoading(true);
            try{
                const response = await signInWithEmailAndPassword(auth, email, password);
                console.log(response);

                const displayName = response.displayName;
                const uid = response.uid;
                navigation.navigate('Tabs', {
                    displayName, uid
                });
                
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
                signIn();
            } catch(error){
                console.error(error);
                alert("Sign Up failed: " + error.message);
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

    return(
        <PasswordEnter />
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
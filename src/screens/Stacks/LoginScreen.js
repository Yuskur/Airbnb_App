import { View, Text, KeyboardAvoidingView, TextInput, StyleSheet, ActivityIndicator, Button, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native';



function Login(){
    const [email, setEmail] = useState("");
    const navigation = useNavigation();

    function continueTo(){
        if(email != ""){
            navigation.navigate('PasswordScreen', {
                email
            });
        }
    };

    //handle continue pressed 

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding'>
            <View style={styles.secondContainer}>
            <TextInput  
                    style={styles.input}
                    placeholder='Email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <TouchableOpacity onPress={continueTo} style={styles.button}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            </KeyboardAvoidingView>
            <View style={styles.secondContainer}>
                <Text style={styles.text}>
                    ------------------------------ or 
                    ------------------------------
                </Text>
            </View>
            <View>
            <TouchableOpacity style={styles.orButtons}>
                <Text style={styles.orText}>Continue with Phone</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.orButtons}>
                <Text style={styles.orText}>Continue with Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.orButtons}>
                <Text style={styles.orText}>Continue with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.orButtons}>
                <Text style={styles.orText}>Continue with Facebook</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}


export default function LoginScreen(){
    return(
       <Login />
    )
}

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
      flex: 1,
    },
    input: {
      marginVertical: 10,
      height: 50,
      borderWidth: 1,
      borderRadius: 4,
      padding: 10,
      backgroundColor: "#fff",
    },
    secondContainer: {
        marginTop: 40
    },  
    button: {
        marginTop: 20,
        backgroundColor: 'hsl(0, 83%, 60%)',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '900',
    },
    text: {
        fontWeight: 'bold'
    }, 
    orButtons: {
        marginTop: 20,
        backgroundColor: 'transparent',
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'black'
    },
    orText: {
        color: 'black',
        fontSize: 15,
        fontWeight: '900',
    }
  });
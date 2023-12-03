import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Profile(){
    const navigation = useNavigation();

    const toLogin = () => {
        navigation.navigate('LoginScreen');
    };

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={toLogin}>
                <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
            {/* <Button title='Login' onPress={toLogin} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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

})
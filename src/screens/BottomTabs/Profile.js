import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Profile(){
    const navigation = useNavigation();

    const toLogin = () => {
        navigation.navigate('LoginScreen');
    };

    return(
        <View>
            <Text>Profile</Text>
            <Button title='Login' onPress={toLogin} />
        </View>
    )
}
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'

import { useNavigation } from "@react-navigation/native";
import { closeSession } from '../../utils/actions';

export default function UserLogged() {
    const navigation = useNavigation()
    
    return (

        <View>
            <Text>User Logged</Text>
            <Button
                title="Cerrar sesion"
                onPress={()=>{
                    closeSession()
                    navigation.navigate("restaurants")
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({})

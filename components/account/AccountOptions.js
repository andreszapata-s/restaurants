import { map } from 'lodash'
import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem } from 'react-native-elements'

import Modal from '../Modal'

export default function AccountOptions({user, toastRef}) {
    const menuOptions =  generateOptions()
    
    const [showModal, setShowModal] = useState(false)

    return (
        <View>
            {
                map(menuOptions, (menu, index) => (
                    <ListItem
                        key = {index}
                        style = {styles.menuItem}
                        onPress= {menu.onPress}
                    >
                        <Icon
                            type="material-community"
                            name = {menu.iconNameLeft}
                            color = {menu.iconColorLeft}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{menu.title}</ListItem.Title>
                        </ListItem.Content>
                        <Icon
                            type="material-community"
                            name = {menu.iconNameRight}
                            color = {menu.iconColorRight}
                        />
                        
                    </ListItem>
                ))
            }
            <Modal isVisible={showModal} setVisible={setShowModal}> 
                <Text>Hola mundo modal!</Text>
            </Modal>
        </View>
    )
}

const generateOptions= () =>{
    return [
        {
            title: "Cambiar nombre y apellido",
            iconNameLeft: "account-circle",
            iconColorLeft: "#a7bfd3",
            iconNameRight: "chevron-right",
            iconColorRight: "#a7bfd3",
            onPress: () => selectedComponent("displayName")
        },
        {
            title: "Cambiar email",
            iconNameLeft: "at",
            iconColorLeft: "#a7bfd3",
            iconNameRight: "chevron-right",
            iconColorRight: "#a7bfd3",  
            onPress: () => selectedComponent("email")
       
        },
        {
            title: "Cambiar contraseña",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#a7bfd3",
            iconNameRight: "chevron-right",
            iconColorRight: "#a7bfd3",
            onPress: () => selectedComponent("password")         
        }
    ]
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth:1,
        borderBottomColor:"#a7bfd3"
    }
})

const selectedComponent = (key) => {
    console.log(key)
}

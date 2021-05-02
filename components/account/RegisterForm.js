import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { size } from 'lodash'
import { useNavigation } from '@react-navigation/native'

import { validateEmail } from '../../utils/helpers'
import { addDocumentWithtId, getCurrentUser, getToken, registerUser } from '../../utils/actions'
import Loading from '../Loading'


export default function RegisterForm() {
    

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirm, setErrorConfirm] = useState("")
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()


    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text}) //El type entre corchetes significa que es dinamico
    }

    const doRegisterUser = async() => {
        if (!validateData()) {
            return;
        }

        setLoading(true)
        const result = await registerUser(formData.email, formData.password)
        if (!result.statusResponse) {
            setLoading(false)
            setErrorEmail(result.error)
            return
        }

        const token = await getToken()
        const resultUser = await addDocumentWithtId("users",{ token }, getCurrentUser().uid)
        if(!resultUser.statusResponse){
            setLoading(false)
            setErrorEmail(result.error)
            return
        }

        setLoading(false)
        navigation.navigate("accounts")
    }

    const validateData = () =>{
        setErrorConfirm("")
        setErrorEmail("")
        setErrorPassword("")
        let isValid = true 

        if(!validateEmail(formData.email)){
            setErrorEmail("Deber ingresar un email válido")
            isValid = false
        }

        if(size(formData.password)< 6){
            setErrorPassword("Debes ingresar una contraseña de minimo 6 caracteres")
            isValid = false
        }
        if(size(formData.confirm)< 6){
            setErrorConfirm("Debes ingresar una confirmacion de minimo 6 caracteres")
            isValid = false
        }
        if(formData.password !== formData.confirm){
            setErrorPassword("La contraseña y la confirmacion no son iguales")
            setErrorConfirm("La contraseña y la confirmacion no son iguales")
            isValid = false
        }
        
        return isValid
    }

    return (
        <View style={styles.form}>
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu email..."
                onChange={(e) =>onChange(e,"email")}
                keyboardType="email-address"
                errorMessage={errorEmail}
                defaultValue={formData.email}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu contraseña..."
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) =>onChange(e,"password")}
                errorMessage={errorPassword}
                defaultValue={formData.password}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ showPassword ? "eye-off" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={()=>{setShowPassword(!showPassword)}}
                    />
                }
            />
            <Input
                containerStyle={styles.input}
                placeholder="Confirma tu contraseña..."
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) =>onChange(e,"confirm")}
                errorMessage={errorConfirm}
                defaultValue={formData.confirm}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ showPassword ? "eye-off" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={()=>{setShowPassword(!showPassword)}}
                    />
                }
            />
            <Button
                title="Registrar nuevo usuario"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => doRegisterUser()}
            />
            <Loading isVisible={loading} text="Creando cuenta..."/>
        </View>
    )
}

const defaultFormValues = () =>{
    return {email : "", password : "", confirm : ""}
}

const styles = StyleSheet.create({
    form:{
        marginTop:30
    },
    input: {
        width:"100%"
    },
    btnContainer:{
        marginTop: 20,
        width: "95%",
        alignSelf:"center"
    },
    btn:{
        backgroundColor:"#442484"
    },
    icon:{
       color:"#c1c1c1" 
    }
})

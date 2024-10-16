import { View, Text, TextInput, Button, KeyboardAvoidingView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Page = () => {
  const { onLogin } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    onLogin!(username, password)
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
        <Text>Sign In</Text>
        <TextInput 
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
        />
        <TextInput 
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
        />
        <Button title="Sign In" onPress={handleLogin} />
        
    </KeyboardAvoidingView>
  )
}

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})


export default Page
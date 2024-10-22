import { View, Text, TextInput, Button, KeyboardAvoidingView, StyleSheet, Alert } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { useFocusEffect } from '@react-navigation/native';

const Page = () => {
  const { onLogin, onRegister } = useAuth() 
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  useFocusEffect(
    useCallback(() => {
      setUsername('');
      setEmail('');
      setFirstName('');
      setLastName('');
      setPassword('');
      setPhoneNumber('');
    }, [])
  );

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Username and password are required')
      return
    }

    onLogin!(username, password)
  }

  const handleRegister = () => {
    if (!username || !email || !firstName || !lastName || !password || !phoneNumber) {
      Alert.alert('Error', 'All fields are required')
      return
    }

    onRegister!(
      username, 
      email, 
      firstName, 
      lastName, 
      password, 
      phoneNumber
    )
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>

      {/* Formulario Sign In */}
      <TextInput 
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      {/* Campos adicionales para Sign Up */}
      {isSignUp && (
        <>
          <TextInput 
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput 
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />
          <TextInput 
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />
          <TextInput 
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={styles.input}
          />
        </>
      )}

      <TextInput 
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Botón para enviar el formulario */}
      <Button 
        title={isSignUp ? 'Sign Up' : 'Sign In'} 
        onPress={isSignUp ? handleRegister : handleLogin} 
      />

      {/* Botón para alternar entre Sign In y Sign Up */}
      <Button 
        title={isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"} 
        onPress={() => setIsSignUp(!isSignUp)} 
        color="gray"
      />
    </KeyboardAvoidingView>
  )
}

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5
  }
})

export default Page

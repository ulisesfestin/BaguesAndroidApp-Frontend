import { View, Text, TextInput, Button, KeyboardAvoidingView, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const Page = () => {
  const { onLogin, onRegister } = useAuth() 
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

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
      <Image 
        source={require("../assets/images/logo-bagues.webp")}
        style={styles.logo}
      />
      <Text>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>

      <TextInput 
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

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
            keyboardType="phone-pad"
          />
        </>
      )}

      <View style={styles.passwordContainer}>
        <TextInput 
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <Button 
        title={isSignUp ? 'Sign Up' : 'Sign In'} 
        onPress={isSignUp ? handleRegister : handleLogin} 
      />

      <Button 
        title={isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"} 
        onPress={() => setIsSignUp(!isSignUp)} 
        color="gray"
      />

      <Text style={styles.footer}>Developed by Ulises Festín</Text>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 320,
    height: 75,
    marginBottom: 50,
    alignSelf: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    width: '80%',
  },
  passwordInput: {
    flex: 1,
    height: 40,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    textAlign: 'center',
    color: 'gray',
  },
})

export default Page

import { View, Text, TextInput, Button, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Page = () => {
  const { onLogin } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onAdminSignIn = async () => {
    onLogin!('admin', 'admin')
  }

  const onUserSignIn = async () => {
    onLogin!('user', 'password')
  }

  const onVendorSignIn = async () => {
    onLogin!('vendor', 'password')
  }

  return (
    <KeyboardAvoidingView>
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
        <Button title="Sign In as Admin" onPress={onAdminSignIn} />
        <Button title="Sign In as User" onPress={onUserSignIn} />
        <Button title="Sign in as Vendor" onPress={onVendorSignIn} />
    </KeyboardAvoidingView>
  )
}

export default Page
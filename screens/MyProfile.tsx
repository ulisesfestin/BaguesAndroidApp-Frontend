import { View, Text, Image } from 'react-native'
import React from 'react'

export default function MyProfile() {
  return (
    <View>
      <Text>MyProfile</Text>
      <Image source={{ uri: 'http://192.168.100.10:8080/images/22dff73e-da08-4a66-8fda-e29c893e5f6c.jpeg' }} />
    </View>
  )
}
import { View, Text, Image } from 'react-native'
import React from 'react'

export default function MyOrders() {
  return (
    <View>
      <Text>MyOrders</Text>
      <Image 
        source={{uri:'https://st.depositphotos.com/1016440/2534/i/450/depositphotos_25344733-stock-photo-sunrise-at-the-beach.jpg'}} 
        style={{width: 200, height: 200}}
      />
    </View>
  )
}
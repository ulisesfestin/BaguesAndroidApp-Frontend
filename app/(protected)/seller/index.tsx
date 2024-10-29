import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import { NavigationProp } from '@react-navigation/native';
import React from 'react'

const options = [
  {
    label: 'List all our products',
    value: 'ProductList'
  },
  {
    label: 'See my orders',
    value: 'MyOrders'
  },
];


export default function ClientIndex({navigation}: {navigation: NavigationProp<any>}) {
    
    return (
      <View style={styles.container}>
        <FlatList
          data={options}
          renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate(item.value)}>
              <Text style={[styles.option, styles.label]}>{item.label}</Text>
            </Pressable>
          )}
          keyExtractor={(item) => item.value}
        />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 8,
      backgroundColor: '#f9f9f9',
    },
    label: {
      fontSize: 16,
    },
    labelContainer: {
      padding: 10,
      margin: 10,
      backgroundColor: 'lightgray',
      borderColor: '#ccc',
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
});


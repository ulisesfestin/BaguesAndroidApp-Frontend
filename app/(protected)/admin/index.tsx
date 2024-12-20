import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import { NavigationProp } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React from 'react'

const options = [
  {
    label: 'Add product',
    value: 'AddProduct'
  },
  {
    label: 'Manage users',
    value: 'UsersAdmin'
  },
  {
    label: 'Manage orders',
    value: 'OrdersAdmin'
  }
];


export default function AdminIndex({navigation}: {navigation: NavigationProp<any>}) {
    
    const router = useRouter();

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


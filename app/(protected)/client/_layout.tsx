import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ClientIndex from '.';
import ProductList from '@/screens/ProductList';
import MyOrders from '@/screens/MyOrders';


const ClientStack = createStackNavigator();

export default function ClientScreen() {
  return (
    <ClientStack.Navigator>
      <ClientStack.Screen 
        name="index" 
        component={ClientIndex} 
        options={{headerShown: false}}
      />
      <ClientStack.Screen 
        name="ProductList"
        component={ProductList} 
      />
      <ClientStack.Screen 
        name="MyOrders"  
        component={MyOrders}
        options={{
            headerTitle: 'My Purchases',
            headerTitleAlign: 'center',
        }} 
      />
    </ClientStack.Navigator>
  );
}

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ClientIndex from '.';
import ProductList from '@/screens/ProductList';
import MyOrders from '@/screens/MyOrders';
import MyProfile from '@/screens/MyProfile';


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
            headerTitle: 'Add Product',
            headerTitleAlign: 'center',
        }} 
      />
      <ClientStack.Screen 
        name="MyProfile"  
        component={MyProfile} 
      />
    </ClientStack.Navigator>
  );
}
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import VendorIndex from '.';
import ProductList from '@/screens/ProductList';
import MyOrders from '@/screens/MyOrders';
import MyProfile from '@/screens/MyProfile';


const VendorStack = createStackNavigator();

export default function AdminScreen() {
  return (
    <VendorStack.Navigator>
      <VendorStack.Screen 
        name="index" 
        component={VendorIndex} 
        options={{headerShown: false}}
      />
      <VendorStack.Screen 
        name="ProductList"
        component={ProductList} 
      />
      <VendorStack.Screen 
        name="MyOrders"  
        component={MyOrders}
        options={{
            headerTitle: 'Add Product',
            headerTitleAlign: 'center',
        }} 
      />
      <VendorStack.Screen 
        name="MyProfile"  
        component={MyProfile} 
      />
    </VendorStack.Navigator>
  );
}

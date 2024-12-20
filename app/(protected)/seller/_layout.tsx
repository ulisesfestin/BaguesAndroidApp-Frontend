import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import VendorIndex from '.';
import ProductList from '@/screens/ProductList';
import MyOrders from '@/screens/MyOrders';


const VendorStack = createStackNavigator();

export default function SellerScreen() {
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
        options={{
          headerTitle: 'Product List',
          headerTitleAlign: 'center',
        }} 
      />
      <VendorStack.Screen 
        name="MyOrders"  
        component={MyOrders}
        options={{
            headerTitle: 'My Orders',
            headerTitleAlign: 'center',
        }} 
      />
    </VendorStack.Navigator>
  );
}

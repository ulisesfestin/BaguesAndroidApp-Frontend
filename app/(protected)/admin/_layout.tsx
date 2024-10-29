import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UsersAdmin from '@/screens/UsersAdmin';
import AddProduct from '@/screens/AddProduct';
import AdminIndex from '.';
import OrdersAdmin from '@/screens/OrdersAdmin';


const AdminStack = createStackNavigator();

export default function AdminScreen() {
  return (
    <AdminStack.Navigator>
      <AdminStack.Screen 
        name="index" 
        component={AdminIndex} 
        options={{headerShown: false}}
      />
      <AdminStack.Screen 
        name="UsersAdmin"
        component={UsersAdmin}
        options={{
          headerTitle: 'Manage Users',
          headerTitleAlign: 'center',
        }}  
      />
      <AdminStack.Screen 
        name="AddProduct"  
        component={AddProduct}
        options={{
            headerTitle: 'Add Product',
            headerTitleAlign: 'center',
        }} 
      />
      <AdminStack.Screen 
        name="OrdersAdmin"  
        component={OrdersAdmin}
        options={{
            headerTitle: 'Manage Orders',
            headerTitleAlign: 'center',
        }} 
      />
    </AdminStack.Navigator>
  );
}

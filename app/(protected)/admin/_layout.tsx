import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminHome from '../../../screens/AdminHome';
import AddProduct from '../../../screens/AddProduct';
import UserList from '../../../screens/UserList';
import AdminIndex from '.';


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
        name="AdminHome"
        component={AdminHome} 
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
        name="UserList"  
        component={UserList} 
      />
    </AdminStack.Navigator>
  );
}

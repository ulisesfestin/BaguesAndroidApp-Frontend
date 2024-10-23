import { Drawer } from 'expo-router/drawer'
import { Ionicons } from '@expo/vector-icons'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useAuth } from '../../context/AuthContext';
import { Role } from '@/types/types';


const DrawerLayout = () => {
    const { authState } = useAuth();

    return (
    <GestureHandlerRootView style={{flex: 1}}>
    <Drawer>
        <Drawer.Screen 
            name="index" 
            options={{
                headerTitle: 'Home',
                headerTitleAlign: 'center',
                drawerLabel: 'Home',
                drawerIcon: ({ size, color }) => 
                    <Ionicons name="home-outline" size={size} color={color} />
            }} 
        />
        <Drawer.Screen 
            name="client"
            redirect={authState?.role !== Role.CLIENT}  
            options={{
                headerTitle: 'Client Area',
                headerTitleAlign: 'center',
                drawerLabel: 'Client',
                drawerIcon: ({ size, color }) => 
                    <Ionicons name="newspaper-outline" size={size} color={color} />
            }} 
        />
        <Drawer.Screen 
            name="admin"
            redirect={authState?.role !== Role.ADMIN} 
            options={{
                headerTitle: 'Admin Area',
                headerTitleAlign: 'center',
                drawerLabel: 'Admin',
                drawerIcon: ({ size, color }) => 
                    <Ionicons name="cog-outline" size={size} color={color} />
            }} 
        />
        <Drawer.Screen 
            name="seller"
            redirect={authState?.role !== Role.SELLER} 
            options={{
                headerTitle: 'Seller Area',
                headerTitleAlign: 'center',
                drawerLabel: 'Seller',
                drawerIcon: ({ size, color }) => 
                    <Ionicons name="business-outline" size={size} color={color} />
            }}
        />
    </Drawer>
    </GestureHandlerRootView>
    )
}

export default DrawerLayout
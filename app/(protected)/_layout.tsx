import { Drawer } from 'expo-router/drawer'
import { Ionicons } from '@expo/vector-icons'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Role, useAuth } from '../../context/AuthContext';


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
            name="news"
            redirect={authState?.role !== Role.USER}  
            options={{
                headerTitle: 'Newsfeed',
                headerTitleAlign: 'center',
                drawerLabel: 'News',
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
            name="vendor"
            redirect={authState?.role !== Role.VENDOR} 
            options={{
                headerTitle: 'Vendor Area',
                headerTitleAlign: 'center',
                drawerLabel: 'Vendor',
                drawerIcon: ({ size, color }) => 
                    <Ionicons name="business-outline" size={size} color={color} />
            }}
        />
    </Drawer>
    </GestureHandlerRootView>
    )
}

export default DrawerLayout
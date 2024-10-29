import { DrawerContentScrollView, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAuth } from '../../context/AuthContext';
import { Role } from '@/types/types';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';


const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const { authState, onLogout } = useAuth();

    const onLogoutPressed = () => {
        onLogout!();
        router.dismissAll();
    };

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItem 
                label="Home" 
                icon={({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />}
                onPress={() => props.navigation.navigate('index')}
            />
            {authState?.role === Role.CLIENT && (
                <DrawerItem 
                    label="Client Area"
                    icon={({ color, size }) => <Ionicons name="newspaper-outline" color={color} size={size} />}
                    onPress={() => props.navigation.navigate('client')}
                />
            )}
            {authState?.role === Role.ADMIN && (
                <DrawerItem 
                    label="Admin Area"
                    icon={({ color, size }) => <Ionicons name="cog-outline" color={color} size={size} />}
                    onPress={() => props.navigation.navigate('admin')}
                />
            )}
            {authState?.role === Role.SELLER && (
                <DrawerItem 
                    label="Seller Area"
                    icon={({ color, size }) => <Ionicons name="business-outline" color={color} size={size} />}
                    onPress={() => props.navigation.navigate('seller')}
                />
            )}
            <DrawerItem 
                label="My Account"
                icon={({ color, size }) => <Ionicons name="people" color={color} size={size} />}
                onPress={() => props.navigation.navigate('profile/index')}
            />
            
            <View style={styles.logoutSection}>
            <DrawerItem 
                label="Logout"
                icon={({ size }) => <Ionicons name="log-out-outline" color="red" size={size} />}
                labelStyle={{ color: 'red', fontWeight: 'bold' }}
                onPress={onLogoutPressed}
            />
            </View>
        </DrawerContentScrollView>
    );
};

const DrawerLayout = () => {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
                {/* Define las pantallas principales aquí */}
                <Drawer.Screen 
                    name="index" 
                    options={{ headerTitle: 'Home', headerTitleAlign: 'center' }}
                />
                <Drawer.Screen 
                    name="client"
                    options={{ headerTitle: 'Client Area', headerTitleAlign: 'center' }}
                />
                <Drawer.Screen 
                    name="admin"
                    options={{ headerTitle: 'Admin Area', headerTitleAlign: 'center' }}
                />
                <Drawer.Screen 
                    name="seller"
                    options={{ headerTitle: 'Seller Area', headerTitleAlign: 'center' }}
                />
                <Drawer.Screen 
                    name="profile/index"
                    options={{ headerTitle: 'My profile', headerTitleAlign: 'center' }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1, // Ocupa todo el espacio disponible
    },
    logoutSection: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingVertical: 10,
    },
});

export default DrawerLayout;

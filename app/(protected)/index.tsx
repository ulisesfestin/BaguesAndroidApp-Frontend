import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/AuthContext'
import WithRole from '../../components/WithRole'
import { router } from 'expo-router'
import { Role } from '@/types/types'

const Page = () => {
  const { authState, onLogout } = useAuth();

  const onLogoutPressed = () => {
    onLogout!();
    router.dismissAll();
  };

  return (
    <View>
      <Text>home</Text>
      <Text>{authState?.username}</Text>
      <Text>{authState?.role}</Text>
      <Button  title="Logout" onPress={onLogoutPressed} />
      <WithRole role={Role.ADMIN}>
        <Text>Only visible for Admin</Text>
      </WithRole>
      <WithRole role={Role.CLIENT}>
        <Text>Only visible for Clients</Text>
      </WithRole>
    </View>
  )
}

export default Page
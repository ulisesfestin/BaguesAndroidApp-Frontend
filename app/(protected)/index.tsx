import { View, Text, Button } from 'react-native'
import React from 'react'
import { Role, useAuth } from '../../context/AuthContext'
import WithRole from '../../components/WithRole'

const Page = () => {
  const { authState, onLogout } = useAuth();

  const onLogoutPressed = () => {
    onLogout!();
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
      <WithRole role={Role.USER}>
        <Text>Only visible for users</Text>
      </WithRole>
    </View>
  )
}

export default Page
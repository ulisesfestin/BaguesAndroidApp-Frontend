import { Stack, useSegments, router } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";

const StackLayout = () => {

  const { authState } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(protected)';
    
    if (!authState?.authenticated && inAuthGroup) {
      router.navigate("/");
    } else if (authState?.authenticated === true) {
      router.push('/(protected)/');
    }
  }, [authState]);
  

  return (
  <Stack>
    <Stack.Screen name="index" options={{headerShown: false}} />
    <Stack.Screen name="(protected)" options={{headerShown: false}} />
  </Stack>
  );
};

const RootLayoutNav = () => {
	return (
		<AuthProvider>
			<StackLayout />
		</AuthProvider>
	);
};

export default RootLayoutNav;
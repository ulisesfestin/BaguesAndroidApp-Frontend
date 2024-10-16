import { Stack, useSegments, router } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";

const StackLayout = () => {

  const { authState } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    console.log('authState', authState);
    console.log('segments', segments);
    const inAuthGroup = segments[0] === '(protected)';
    console.log(segments)
    
    if (!authState?.authenticated && inAuthGroup) {
      console.log('Redirecting to / because user is not authenticated');

      router.back();
      console.log('segments', segments);
    } else if (authState?.authenticated === true) {
      console.log('Redirecting to (protected) because user is authenticated');
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
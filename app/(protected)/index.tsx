import { View, Text, Button, Image, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import WithRole from '@/components/WithRole';
import { Role } from '@/types/types';

const Page = () => {
  const { authState } = useAuth();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../../assets/images/welcome.jpeg")} style={styles.image} />
      <Text style={styles.title}>Welcome to Our App!</Text>
      <Text style={styles.subtitle}>Hello, {authState?.username}!</Text>
      <WithRole role={Role.ADMIN}>
        <Text style={styles.description}>
        As an administrator, this application allows you to manage the products offered in Bagues as well as the order logistics. 
        Here are some of the features you can use:
        </Text>
        <View style={styles.featuresContainer}>
          <Text style={styles.feature}>- Add products to our database</Text>
          <Text style={styles.feature}>- View client and seller orders</Text>
          <Text style={styles.feature}>- Accept or reject orders</Text>
          <Text style={styles.feature}>- See the users of the app</Text>
          <Text style={styles.feature}>- Assign roles to specific users</Text>
        </View>
      </WithRole>
      <WithRole role={Role.SELLER}>
        <Text style={styles.description}>
        As a seller, this application allows you to consult our products and place your orders, our administration team will be in charge of accepting or rejecting them. 
        Here are some of the features you can use:
        </Text>
        <View style={styles.featuresContainer}>
          <Text style={styles.feature}>- View the list of products</Text>
          <Text style={styles.feature}>- Select those that interest you</Text>
          <Text style={styles.feature}>- Place the orders you need</Text>
          <Text style={styles.feature}>- View your order history</Text>
        </View>
      </WithRole>
      <WithRole role={Role.CLIENT}>
        <Text style={styles.description}>
        As a customer, this application allows you to consult our products and be able to buy them whenever you like. 
        Here are some of the features you can use:
        </Text>
        <View style={styles.featuresContainer}>
          <Text style={styles.feature}>- View the list of products</Text>
          <Text style={styles.feature}>- Select those that you are interested in buying</Text>
          <Text style={styles.feature}>- View your purchase history</Text>
        </View>
      </WithRole>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 400,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  feature: {
    fontSize: 16,
    marginBottom: 10,
  },
  adminText: {
    fontSize: 16,
    color: 'red',
    marginTop: 20,
  },
  clientText: {
    fontSize: 16,
    color: 'blue',
    marginTop: 20,
  },
});

export default Page;
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import apiClient from '../api/apiClient';
import { showAlert } from '@/utils/alerts';
import { Product } from '@/types/types';


export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get('/products/all');
        setProducts(response.data); 
      } catch (error) {
        showAlert("There was an error fetching the products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.productContainer}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text>{item.description}</Text>
          <Text>Precio: ${item.price}</Text>
          <Text>Código: {item.code}</Text>
          {item.imageUrl && (
            <Image 
              source={{uri: item.imageUrl}}
              style={styles.productImage}
            />
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  productContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});



import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import apiClient from '../api/apiClient';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  code: string;
  stock: number;
  imageUrl?: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para obtener los productos desde la API
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get('/products/all');
        setProducts(response.data); // Asume que la API devuelve un array de productos
      } catch (error) {
        console.error("Error al obtener productos:", error);
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
          <Text>Stock: {item.stock}</Text>
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



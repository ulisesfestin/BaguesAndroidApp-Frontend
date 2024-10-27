import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Button, Modal, TextInput } from 'react-native';
import apiClient from '../api/apiClient';
import { showAlert } from '@/utils/alerts';
import { Product, Role } from '@/types/types';
import WithRole from '@/components/WithRole';
import { useAuth } from '@/context/AuthContext';

export default function ProductList() {
  const { authState } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<{ product: Product; quantity: number }[]>([]);

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

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setQuantity('');
  };

  const handleAddToCartOrOrder = () => {
    if (selectedProduct && quantity) {
      const cartItem = { product: selectedProduct, quantity: parseInt(quantity, 10) };
      setSelectedItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex(item => item.product.id === cartItem.product.id);
        if (existingItemIndex > -1) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex].quantity += cartItem.quantity;
          return updatedItems;
        } else {
          return [...prevItems, cartItem];
        }
      });

      closeModal();
    }
  };

  const handleClearSelection = () => {
    setSelectedItems([]);
  };

  const handleSendOrder = async () => {
    const userId = authState?.id;
    const orderType = authState?.role === Role.SELLER ? "Order" : "Purchase";
    if (!userId || !orderType) {
      showAlert("User not authenticated");
      return;
    }

    const orderData = {
      userId: userId,
      type: orderType,
      status: "Pending approval",
      details: selectedItems.map(item => ({
        productName: item.product.name,
        quantity: item.quantity
      }))
    };

    try {
      await apiClient.post('/orders', orderData);
      showAlert("Order sent!");
      handleClearSelection();
    } catch (error) {
      showAlert("There was an error sending the order");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Code: {item.code}</Text>
            {item.imageUrl && (
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.productImage}
              />
            )}
            <WithRole role={Role.SELLER}>
              <Button title="Add to order" onPress={() => openModal(item)} />
            </WithRole>
            <WithRole role={Role.CLIENT}>
              <Button title="Add to cart" onPress={() => openModal(item)} />
            </WithRole>
          </View>
        )}
      />

      {selectedItems.length > 0 && (
        <View style={styles.cartContainer}>
          <Text style={styles.cartTitle}>Selected Products:</Text>
          {selectedItems.map((item, index) => (
            <Text key={index}>
              {item.product.name} (Quantity: {item.quantity})
            </Text>
          ))}

          <Button title="Send Order" onPress={handleSendOrder} />
          <Button title="Clear Selection" onPress={handleClearSelection} />
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Quantity for {selectedProduct?.name}</Text>
            <TextInput
              style={styles.input}
              placeholder="Quantity"
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={closeModal} />
              <Button title="Add" onPress={handleAddToCartOrOrder} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

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
    width: 200,
    height: 200,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
    marginBottom: 15,
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cartContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

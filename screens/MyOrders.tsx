import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; 
import apiClient from '../api/apiClient'; 
import { Order } from '../types/types'; 
import { showAlert } from '@/utils/alerts';

export default function MyOrders() {
  const { authState } = useAuth(); 
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = authState?.id; 
      if (!userId) {
        return;
      }

      try {
        const response = await apiClient.get(`/orders/user/${userId}`);
        setOrders(response.data);
      } catch (error) {
        showAlert('There was an error fetching the orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [authState]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const getOrderStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending approval':
        return styles.pendingApproval;
      case 'approved':
        return styles.approved;
      case 'rejected':
        return styles.rejected;
      default:
        return styles.defaultStatus;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.orderContainer, getOrderStyle(item.status)]}>
            <Text style={styles.orderType}>Type: {item.type}</Text>
            <Text style={styles.orderStatus}>Status: {item.status}</Text>
            {item.details.map((detail, index) => (
              <View key={index} style={styles.orderDetail}>
                <Text style={styles.productName}>Product: {detail.productName}</Text>
                <Text style={styles.quantity}>Quantity: {detail.quantity}</Text>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderContainer: {
    marginBottom: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
  },
  orderType: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderStatus: {
    fontSize: 16,
  },
  orderDetail: {
    marginTop: 8,
  },
  productName: {
    fontSize: 16,
  },
  quantity: {
    fontSize: 16,
    color: 'gray',
  },
  pendingApproval: {
    backgroundColor: '#FFFACD',
  },
  approved: {
    backgroundColor: '#90EE90',
  },
  rejected: {
    backgroundColor: '#FF6347',
  },
  defaultStatus: {
    backgroundColor: 'white',
  },
});
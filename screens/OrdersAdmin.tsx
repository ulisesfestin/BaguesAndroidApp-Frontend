import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button } from "react-native";
import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient"; 
import { Order } from "../types/types"; 
import { showAlert } from "@/utils/alerts";

const OrdersAdmin = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiClient.get('/orders');
        setOrders(response.data);
      } catch (error) {
        showAlert('There was an error fetching the orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateOrder = async (orderId: number, newStatus: string) => {
    try {
      const orderToUpdate = orders.find(order => order.id === orderId);
      if (!orderToUpdate) return;

      const { id, ...orderWithoutId } = { ...orderToUpdate, status: newStatus };

      await apiClient.put(`/orders/${orderId}`, orderWithoutId);
      setOrders((prevOrders) => prevOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      showAlert('Order updated successfully.');

    } catch (error) {
      showAlert('There was an error updating the order.');
    }
  };

  const handleAcceptOrder = (orderId: number) => {
    handleUpdateOrder(orderId, 'Approved');
  };

  const handleRejectOrder = (orderId: number) => {
    handleUpdateOrder(orderId, 'Rejected');
  };

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
            {item.status.toLowerCase() === 'pending approval' && (
              <View style={styles.buttonContainer}>
                <Button title="Accept" onPress={() => handleAcceptOrder(item.id)} color="green" />
                <Button title="Reject" onPress={() => handleRejectOrder(item.id)} color="red" />
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

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
    color: 'gray',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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

export default OrdersAdmin;
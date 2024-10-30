import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient'; 
import { showAlert } from '@/utils/alerts'; 
import { Picker } from '@react-native-picker/picker'; 
import { User } from '@/types/types'; 


const UsersAdmin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get('/users');
        setUsers(response.data);
      } catch (error) {
        showAlert('There was an error fetching the users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdateRole = async (userId: number, newRole: string) => {
    try {
      const userToUpdate = users.find(user => user.id === userId);
      if (!userToUpdate) return;

      const { id, ...userWithoutId } = { ...userToUpdate, role: newRole };

      await apiClient.put(`/users/${userId}`, userWithoutId);
      setUsers((prevUsers) => prevUsers.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
    } catch (error) {
      showAlert('There was an error updating the user role');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.userInfo}>Username: {item.username}</Text>
            <Text style={styles.userInfo}>Name: {item.firstName} {item.lastName}</Text>
            <Text style={styles.userInfo}>Email: {item.email}</Text>
            <Text style={styles.userInfo}>Phone: {item.phoneNumber}</Text>
            <Text style={styles.userInfo}>Role: {item.role}</Text>
            <Picker
              selectedValue={item.role}
              style={styles.picker}
              onValueChange={(itemValue: string) => handleUpdateRole(item.id, itemValue)}
            >
              <Picker.Item label="Client" value="CLIENT" />
              <Picker.Item label="Admin" value="ADMIN" />
              <Picker.Item label="Seller" value="SELLER" />
            </Picker>
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  userContainer: {
    marginBottom: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  picker: {
    height: 50,
    width: '100%',
    marginTop: 8,
  },
});

export default UsersAdmin;
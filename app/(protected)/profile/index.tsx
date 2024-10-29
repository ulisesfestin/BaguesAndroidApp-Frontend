import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext'; 
import apiClient from '@/api/apiClient'; 
import { showAlert } from '@/utils/alerts'; 
import { User } from '@/types/types';

export default function MyProfile() {
  const { authState } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [editing, setEditing] = useState(false); 

  useEffect(() => {
    const fetchUser = async () => {
      const userId = authState?.id; 
      if (!userId) {
        showAlert('User not authenticated');
        return;
      }

      try {
        const response = await apiClient.get(`/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        showAlert('There was an error fetching the user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [authState]);

  const handleUpdate = async () => {
    if (!user) return;

    setUpdating(true);
    const { id, ...userWithoutId } = user;

    try {
      await apiClient.put(`/users/${id}`, userWithoutId);
      showAlert('User updated successfully');
      setEditing(false); 
    } catch (error) {
      showAlert('There was an error updating the user data');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {user && (
        <>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{user.username}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>
          <Text style={styles.label}>First Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={user.firstName}
            editable={editing}
            onChangeText={(text) => setUser({ ...user, firstName: text })}
          />
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={user.lastName}
            editable={editing}
            onChangeText={(text) => setUser({ ...user, lastName: text })}
          />
          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={user.phoneNumber}
            editable={editing}
            onChangeText={(text) => setUser({ ...user, phoneNumber: text })}
          />
          {editing ? (
            <Button title="Save Changes" onPress={handleUpdate} disabled={updating} />
          ) : (
            <Button title="Edit Profile" onPress={() => setEditing(true)} />
          )}
        </>
      )}
    </View>
  );
}

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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
});
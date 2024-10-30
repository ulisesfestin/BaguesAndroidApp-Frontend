import React, { useState } from 'react';
import { ScrollView, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../config/firebaseConfig'; 
import apiClient from '../api/apiClient';
import { showAlert } from '../utils/alerts';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [code, setCode] = useState('');
  const [imageUri, setImageUri] = useState<string | null>('');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImageToFirebase = async () => {
    if (!imageUri) return null;

    const response = await fetch(imageUri);
    const blob = await response.blob();
    const storageRef = ref(storage, `products/images/${new Date().getTime()}.jpg`);
    const snapshot = await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(snapshot.ref);

    return url;
  };

  async function deleteImageFromFirebase(filePath: string) {
    const storageRef = ref(storage, filePath);
    await deleteObject(storageRef);
  };

  const handleSubmit = async () => {

    if (!name || !description || !price || !code || !imageUri) {
      showAlert("Please fill all fields and select an image");
      return;
    }

    setLoading(true);

    const imageUrl = await uploadImageToFirebase(); 

    const getPathFromUrl = (url: string) => {
      const decodedUrl = decodeURIComponent(url);
      const pathMatch = decodedUrl.match(/\/o\/(.*?)\?/);
      return pathMatch ? pathMatch[1] : null;
    };

    const imagePath = imageUrl ? getPathFromUrl(imageUrl) : null;

    const productData = {
      name,
      description,
      price,
      code,
      imageUrl,
    };

    try {
      await apiClient.post('/products/save', productData);
      showAlert('Product added successfully');
    } catch (error) {
      showAlert('Error adding product');
      if (imagePath) {
        await deleteImageFromFirebase(imagePath);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Product Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="..."
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        placeholder="$ "
      />

      <Text style={styles.label}>Product Code</Text>
      <TextInput
        style={styles.input}
        value={code}
        onChangeText={setCode}
        placeholder="See in the catalog."
      />

      <Button title="Upload an image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <Button title={loading ? 'Loading...' : 'Add Product'} onPress={handleSubmit} disabled={loading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 15,
    alignSelf: 'center',
  },
});

export default AddProduct;
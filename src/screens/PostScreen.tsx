import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadPost } from '@/services/posts';
import { useAuth } from '@/contexts/AuthContext';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/services/firebase';


type AuthContextType = {
    currentUser: User | null;
  };
  
  export const AuthContext = createContext<AuthContextType>({
    currentUser: null,
  });
  
  type AuthProviderProps = {
    children: ReactNode;
  };
  
  export function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, setCurrentUser);
      return unsubscribe;
    }, []);
  
    return (
      <AuthContext.Provider value={{ currentUser }}>
        {children}
      </AuthContext.Provider>
    );
  }

export default function PostScreen() {
    const { currentUser } = useAuth();

  const [caption, setCaption] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission denied', 'We need camera roll permission to choose images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    if (!imageUri || !caption.trim()) {
      Alert.alert('Missing fields', 'Please select an image and enter a caption.');
      return;
    }

    try {
      setLoading(true);
      if (!currentUser) {
        Alert.alert('Error', 'You must be logged in to post.');
        return;
      }
      await uploadPost(currentUser.uid, imageUri, caption.trim());
      

      Alert.alert('Success', 'Your post has been uploaded!');
      setImageUri(null);
      setCaption('');
    } catch (error) {
      console.error(error);
      Alert.alert('Upload Failed', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Choose Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <TextInput
        style={styles.input}
        placeholder="Write a caption..."
        value={caption}
        onChangeText={setCaption}
        multiline
      />
      <Button
        title={loading ? 'Uploading...' : 'Upload Post'}
        onPress={handleUpload}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    marginVertical: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  image: {
    width: '100%',
    height: 300,
    marginTop: 16,
    borderRadius: 10,
  },
});

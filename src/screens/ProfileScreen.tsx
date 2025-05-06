import { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useAuth } from '../contexts/AuthContext';
import { useRoute } from '@react-navigation/native';

export default function ProfileScreen() {
  const { currentUser } = useAuth();
  const route = useRoute();
  const { uid } = route.params as { uid: string }; // ดึง uid จาก route params

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }
    };

    fetchProfile();
  }, [uid]);

  if (!userData) {
    return <ActivityIndicator style={{ marginTop: 20 }} />;
  }

  return (
    <View style={styles.container}>
      {userData.avatarUrl && (
        <Image source={{ uri: userData.avatarUrl }} style={styles.avatar} />
      )}
      <Text style={styles.name}>@{userData.handle}</Text>
      <Text>{userData.bio || 'No bio'}</Text>
      <Text>Followers: {userData.followers?.length || 0}</Text>
      <Text>Following: {userData.following?.length || 0}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
  name: { fontSize: 20, fontWeight: 'bold' },
});

import { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useAuth } from '../contexts/AuthContext'; // ใช้ path นี้ตามที่คุณมี

export default function ProfileScreen() {
  const { currentUser } = useAuth(); // ดึง uid จาก context
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser?.uid) return;
      const userRef = doc(db, 'users', currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }
    };

    fetchProfile();
  }, [currentUser]);

  if (!userData) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      {userData.avatarUrl && (
        <Image source={{ uri: userData.avatarUrl }} style={styles.avatar} />
      )}
      <Text style={styles.name}>{userData.handle}</Text>
      <Text>{userData.bio || 'No bio'}</Text>
      <Text>Followers: {userData.followers.length}</Text>
      <Text>Following: {userData.following.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
  name: { fontSize: 20, fontWeight: 'bold' },
});

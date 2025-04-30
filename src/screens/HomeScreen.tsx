import { FlatList, Image, StyleSheet, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function HomeScreen() {
  const { user } = useAuth();
  const [snapshot] = useCollection(
    query(
      collection(db, 'posts'),
      where('uid', '==', user?.uid),
      orderBy('timestamp', 'desc'),
      limit(3)
    )
  );

  return (
    <FlatList
      data={snapshot?.docs}
      numColumns={3}
      renderItem={({ item }) => (
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.data().imageURL }} style={styles.image} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    aspectRatio: 1,
    margin: 2,
  },
  image: {
    flex: 1,
    borderRadius: 4,
  },
});
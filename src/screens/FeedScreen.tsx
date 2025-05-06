import { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/services/firebase';

export default function FeedScreen() {
const [posts, setPosts] = useState<any[]>([]);

useEffect(() => {
    const fetchPosts = async () => {
const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
const snapshot = await getDocs(q);
const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
setPosts(data);
    };

    fetchPosts();
}, []);

return (
    <FlatList
data={posts}
keyExtractor={item => item.id}
renderItem={({ item }) => (
        <View style={{ marginBottom: 24 }}>
        <Image source={{ uri: item.imageUrl }} style={{ height: 200 }} />
        <Text>{item.caption}</Text>
        </View>
)}
    />
);
}

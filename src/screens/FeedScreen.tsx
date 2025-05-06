import { useEffect, useState } from 'react';
import { FlatList, Image, Text, View, ActivityIndicator } from 'react-native';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { getFeed } from '@/services/posts'; // สร้างฟังก์ชันนี้
import { Post } from '../types';

export default function FeedScreen() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const snapshot = await getDocs(collection(db, 'posts'));
            const fetchedPosts: Post[] = snapshot.docs.map(doc => {
              const data = doc.data();
              return {
                id: doc.id,
                uid: data.uid,
                imageUrl: data.imageUrl,
                caption: data.caption,
                createdAt: data.createdAt,
                likes: data.likes || [],
              };
            });
            setPosts(fetchedPosts);
          } catch (error) {
            console.error('Error loading posts:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchPosts();
      }, []);
    
      if (loading) return <ActivityIndicator />;
    
      return (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <View style={{ padding: 10 }}>
              <Text>{item.caption}</Text>
            </View>
          )}
        />
      );
    }
    
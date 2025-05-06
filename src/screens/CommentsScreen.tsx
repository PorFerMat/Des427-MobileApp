import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/services/firebase';

export default function CommentsScreen({ postId }: { postId: string }) {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const q = query(
        collection(db, 'posts', postId, 'comments'),
        orderBy('createdAt', 'asc')
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => doc.data());
      setComments(data);
    };

    fetchComments();
  }, [postId]);

  return (
    <View>
      {comments.map((comment, i) => (
        <Text key={i}>{comment.text}</Text>
      ))}
    </View>
  );
}

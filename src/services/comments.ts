import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db, storage } from '../services/firebase';

export const fetchComments = async (postId: string) => {
  const q = query(
    collection(db, `posts/${postId}/comments`),
    orderBy('createdAt', 'asc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

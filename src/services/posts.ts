// src/services/posts.ts
import { db, storage } from '../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp, getDocs, query, where, orderBy } from 'firebase/firestore';

export const getFeed = async () => {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
  
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

export const uploadPost = async (uid: string, imageUri: string, caption: string) => {
  try {
    // แปลงรูปเป็น blob
    const response = await fetch(imageUri);
    const blob = await response.blob();

    // กำหนดชื่อไฟล์และ path
    const filename = `${uid}_${Date.now()}.jpg`;
    const storageRef = ref(storage, `posts/${filename}`);

    // อัปโหลดรูปไปยัง Firebase Storage
    await uploadBytes(storageRef, blob);

    // รับ URL ของรูปที่อัปโหลดแล้ว
    const downloadURL = await getDownloadURL(storageRef);

    // เพิ่มโพสต์ใหม่ใน Firestore
    await addDoc(collection(db, 'posts'), {
      uid,
      imageUrl: downloadURL,
      caption,
      createdAt: Timestamp.now(),
      likes: []
    });
  } catch (error) {
    console.error('Failed to upload post:', error);
    throw error;
  }
};

export const fetchFeed = async (following: string[]) => {
    if (following.length === 0) return [];
  
    const q = query(
      collection(db, 'posts'),
      where('uid', 'in', following),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

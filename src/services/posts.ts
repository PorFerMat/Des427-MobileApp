// src/services/posts.ts
import { db, storage } from '../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

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

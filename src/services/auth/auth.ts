import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { runTransaction, doc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import api from '../api';

// // ใน auth.ts
// export const uploadImage = async (uri: string) => {
//   console.log('Uploading image:', uri);
//   // TODO: เชื่อม Firebase Storage หรือ Supabase Storage ที่นี่
// };


// export const signUp = async (email: string, password: string, handle: string) => {
//   try {
//     const handleRef = doc(db, 'handles', handle.toLowerCase());
    
//     await runTransaction(db, async (transaction) => {
//       // Check handle availability
//       const handleDoc = await transaction.get(handleRef);
//       if (handleDoc.exists()) {
//         throw new Error('handle-taken');
//       }

//       // Create auth user
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const uid = userCredential.user.uid;

//       // Create user document
//       transaction.set(doc(db, 'users', uid), {
//         email,
//         handle: handle.toLowerCase(),
//         following: [],
//         followers: [],
//         createdAt: new Date().toISOString(),
//       });

//       // Reserve handle
//       transaction.set(handleRef, { uid });
//     });
    
//   // } catch (error) {
//   //   let errorCode = 'signup-failed';
//   //   if (error instanceof Error) {
//   //     if (error.message.includes('auth/email-already-in-use')) {
//   //       errorCode = 'email-used';
//   //     } else if (error.message.includes('auth/weak-password')) {
//   //       errorCode = 'weak-password';
//   //     } else if (error.message.includes('handle-taken')) {
//   //       errorCode = 'handle-taken';
//   //     }
//   //   }
//   //   throw new Error(errorCode);
//   // }
// } catch (error) {
//   let errorCode = 'signup-failed';
//   if (error instanceof FirebaseError) {
//     if (error.code === 'auth/email-already-in-use') {
//       errorCode = 'email-used';
//     } else if (error.code === 'auth/weak-password') {
//       errorCode = 'weak-password';
//     }
//   } else if (error instanceof Error && error.message === 'handle-taken') {
//     errorCode = 'handle-taken';
//   }
//   throw new Error(errorCode);
// }

// };

// export const login = async (email: string, password: string) => {
//   return await signInWithEmailAndPassword(auth, email, password);
// };

// สมัครผู้ใช้ใหม่ผ่าน backend API
export const signUp = async (email: string, password: string, handle: string) => {
  try {
    const res = await api.post('/auth/signup', { email, password, handle });
    return res.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('signup-failed');
  }
};

// ล็อกอินผู้ใช้ผ่าน backend API
export const login = async (email: string, password: string) => {
  try {
    const res = await api.post('/auth/login', { email, password });
    return res.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('login-failed');
  }
};

// สำหรับอัปโหลดภาพ (ยังคง TODO)
export const uploadImage = async (uri: string) => {
  console.log('Uploading image:', uri);
  // จะเชื่อม Supabase หรือ Firebase Storage ผ่าน backend หรือ client ก็ได้
};
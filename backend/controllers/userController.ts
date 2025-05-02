import { Request, Response } from 'express';
import admin from 'firebase-admin';

// POST /signup
export const createUser = async (req: Request, res: Response) => {
  const { email, password, handle } = req.body;

  try {
    // 1. สร้าง user บน Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    const uid = userRecord.uid;

    // 2. บันทึกข้อมูล user ลง Firestore
    const db = admin.firestore();
    await db.collection('users').doc(uid).set({
      email,
      handle,
      createdAt: new Date().toISOString(),
      followers: [],
      following: [],
    });

    // 3. จอง handle
    await db.collection('handles').doc(handle.toLowerCase()).set({ uid });

    res.status(201).json({ message: 'User created successfully', uid });
  } catch (error: any) {
    console.error(error);
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({ message: 'email-used' });
    }
    if (error.code === 'auth/weak-password') {
      return res.status(400).json({ message: 'weak-password' });
    }
    return res.status(500).json({ message: 'signup-failed' });
  }
};

import { Request, Response } from 'express';
import admin from 'firebase-admin';

export const signUp = async (req: Request, res: Response) => {
const { email, password, handle } = req.body;

try {
// Create Firebase Auth user
const userRecord = await admin.auth().createUser({
email,
password,
});
// Save user data to Firestore
const db = admin.firestore();
const handleDoc = db.collection('handles').doc(handle.toLowerCase());
const userDoc = db.collection('users').doc(userRecord.uid);

const handleSnapshot = await handleDoc.get();
if (handleSnapshot.exists){
return res.status(400).json({ message: 'handle-taken' });
}

await db.runTransaction(async (transaction) => {
transaction.set(userDoc, {
    email,
    handle: handle.toLowerCase(),
    following: [],
    followers: [],
    createdAt: new Date().toISOString(),
});

transaction.set(handleDoc, { uid: userRecord.uid });
});

res.status(201).json({ uid: userRecord.uid, email });
} catch (error: any) {
    if (error.code === 'auth/email-already-exists') {
    return res.status(400).json({ message: 'email-used' });
    }
    if (error.code === 'auth/invalid-password') {
    return res.status(400).json({ message: 'weak-password' });
    }
    res.status(500).json({ message: error.message || 'signup-failed' });
    }
    };
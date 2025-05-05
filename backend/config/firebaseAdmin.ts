import admin from 'firebase-admin';
import { config } from 'dotenv';

config(); // โหลดไฟล์ .env

// แปลงจาก string (ใน .env) กลับเป็น object
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://des427-8f9bb.firebaseio.com', // ใส่ project id ให้ถูก
  });
}

export const db = admin.firestore();
export const auth = admin.auth();

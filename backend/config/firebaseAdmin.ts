import admin from 'firebase-admin';
import serviceAccount from '../keys/serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com',
});

export const db = admin.firestore();
export const auth = admin.auth();

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export async function signUp(email: string, password: string, handle: string) {
  const handleRef = doc(db, 'handles', handle);
  const handleSnap = await getDoc(handleRef);
  if (handleSnap.exists()) throw new Error('Handle already taken.');

  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;

  await setDoc(doc(db, 'users', uid), {
    email,
    handle,
    following: [],
  });

  await setDoc(handleRef, { uid });
}

export async function login(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password);
}

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { runTransaction, doc, setDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const signUp = async (email: string, password: string, handle: string) => {
  const handleRef = doc(db, 'handles', handle);
  
  await runTransaction(db, async (transaction) => {
    const handleDoc = await transaction.get(handleRef);
    if (handleDoc.exists()) throw new Error('Handle already taken');
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    
    transaction.set(doc(db, 'users', uid), {
      email,
      handle,
      following: [],
      followers: [],
    });
    
    transaction.set(handleRef, { uid });
  });
};

export const login = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const uploadImage = async (uri: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  
  const storageRef = ref(storage, `posts/${user.uid}/${Date.now()}`);
  const response = await fetch(uri);
  const blob = await response.blob();
  
  await uploadBytes(storageRef, blob);
  return getDownloadURL(storageRef);
};

export const followUser = async (targetHandle: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  
  const handleDoc = await getDoc(doc(db, 'handles', targetHandle));
  if (!handleDoc.exists()) throw new Error('User not found');
  
  await updateDoc(doc(db, 'users', user.uid), {
    following: arrayUnion(handleDoc.data().uid)
  });
};

export const unfollowUser = async (targetHandle: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  
  const handleDoc = await getDoc(doc(db, 'handles', targetHandle));
  if (!handleDoc.exists()) throw new Error('User not found');
  
  await updateDoc(doc(db, 'users', user.uid), {
    following: arrayRemove(handleDoc.data().uid)
  });
};
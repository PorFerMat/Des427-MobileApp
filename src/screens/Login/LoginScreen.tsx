import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';

export const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
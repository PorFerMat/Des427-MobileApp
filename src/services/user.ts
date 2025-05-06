import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, storage } from '../services/firebase';

export const followUser = async (currentUid: string, targetUid: string) => {
  await updateDoc(doc(db, 'users', currentUid), {
    following: arrayUnion(targetUid),
  });
  await updateDoc(doc(db, 'users', targetUid), {
    followers: arrayUnion(currentUid),
  });
};

export const unfollowUser = async (currentUid: string, targetUid: string) => {
  await updateDoc(doc(db, 'users', currentUid), {
    following: arrayRemove(targetUid),
  });
  await updateDoc(doc(db, 'users', targetUid), {
    followers: arrayRemove(currentUid),
  });
};
export const updateUserProfile = async (
  uid: string,
  handle: string,
  bio: string,
  avatarUrl: string
) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    handle,
    bio,
    avatarUrl,
  });
};
export const updateUserBio = async (uid: string, bio: string) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    bio,
  });
}
export const updateUserAvatar = async (uid: string, avatarUrl: string) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    avatarUrl,
  });
}
export const updateUserHandle = async (uid: string, handle: string) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    handle,
  });
}
export const updateUserFollowing = async (uid: string, following: string[]) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    following,
  });
}
export const updateUserFollowers = async (uid: string, followers: string[]) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    followers,
  });
}
export const updateUserCreatedAt = async (uid: string, createdAt: string) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    createdAt,
  });
}
export const updateUserEmail = async (uid: string, email: string) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    email,
  });
}
export const updateUserPassword = async (uid: string, password: string) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    password,
  });
}
export const updateUser = async (
  uid: string,
  handle: string,
  bio: string,
  avatarUrl: string,
  following: string[],
  followers: string[],
  createdAt: string,
  email: string,
  password: string
) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    handle,
    bio,
    avatarUrl,
    following,
    followers,
    createdAt,
    email,
    password,
  });
}
// src/types.ts

export interface UserProfile {
    uid: string;
    email: string;
    handle: string;
    name?: string;
    bio?: string;
    avatarUrl?: string;
    followers: string[];
    following: string[];
    createdAt: any; // หรือใช้ Timestamp จาก Firestore
  }
  
  export interface Post {
    id?: string;
    uid: string;
    imageUrl: string;
    caption: string;
    createdAt: any; // หรือใช้ Timestamp
    likes: string[];
  }
  
  export interface Comment {
    id?: string;
    uid: string;
    text: string;
    createdAt: any;
  }
  
// FILE: lib/firebase/auth.ts (UPDATED)
// PATH: /legato/lib/firebase/auth.ts
// Remove cookie imports and keep only Firebase functions

import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  UserCredential
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./config";

export type UserRole = 'client' | 'lawyer';

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  phone?: string;
  createdAt: any;
  updatedAt: any;
}

export async function registerUser(
  email: string, 
  password: string, 
  displayName: string, 
  role: UserRole,
  additionalData?: any
): Promise<UserCredential> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    await updateProfile(userCredential.user, { displayName });
    
    const userProfile: UserData = {
      uid: userCredential.user.uid,
      email: email,
      displayName: displayName,
      role: role,
      photoURL: userCredential.user.photoURL || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...additionalData
    };
    
    await setDoc(doc(db, "users", userCredential.user.uid), userProfile);
    
    return userCredential;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

export async function loginUser(email: string, password: string): Promise<UserCredential> {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}

export async function getUserProfile(uid: string): Promise<UserData | null> {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    return null;
  } catch (error) {
    console.error("Get user profile error:", error);
    return null;
  }
}
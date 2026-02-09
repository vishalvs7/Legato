// FILE: useAuth.ts
// PATH: /legato/hooks/useAuth.ts
// PURPOSE: React hook for authentication state and actions

import { useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { getUserProfile, UserProfile } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // Fetch user profile with role
        const profile = await getUserProfile(firebaseUser.uid);
        setUserProfile(profile);
        
        // Set role in cookies for middleware
        if (profile?.role) {
          document.cookie = `legato-role=${profile.role}; path=/; max-age=86400`;
        }
      } else {
        setUserProfile(null);
        // Clear cookies when logged out
        document.cookie = 'legato-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Sign out function
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Redirect based on role
  const redirectBasedOnRole = () => {
    if (!userProfile) return;
    
    if (userProfile.role === 'client') {
      router.push('/dashboard/profile');
    } else if (userProfile.role === 'lawyer') {
      router.push('/dashboard');
    }
  };

  return {
    user,
    userProfile,
    loading,
    isAuthenticated: !!user,
    signOut,
    redirectBasedOnRole,
  };
}
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, authHelpers } from '../services/supabase';
import { googleAuthService } from '../services/googleAuth';
import toast from 'react-hot-toast';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [authProvider, setAuthProvider] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check for Google OAuth session first
        const googleSession = googleAuthService.getSession();
        if (googleSession.user && googleAuthService.isTokenValid(googleSession.token)) {
          setUser(googleSession.user);
          setSession(googleSession.token);
          setAuthProvider('google');
          setLoading(false);
          return;
        }

        // Check for Supabase session
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        setAuthProvider(session ? 'supabase' : null);
      } catch (error) {
        console.error('Error getting session:', error);
        setSession(null);
        setUser(null);
        setAuthProvider(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          setAuthProvider(session ? 'supabase' : null);
        }
      );
      return () => subscription?.unsubscribe?.();
    } catch (error) {
      console.error('Error setting up auth listener:', error);
    }
  }, []);

  const signUp = async (email, password, userData) => {
    try {
      const { data, error } = await authHelpers.signUp(email, password, userData);
      if (error) throw error;
      toast.success('Sign up successful! Please check your email for verification.');
      return { data, error: null };
    } catch (error) {
      toast.error(error.message);
      return { data: null, error };
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await authHelpers.signIn(email, password);
      if (error) throw error;
      toast.success('Signed in successfully!');
      setAuthProvider('supabase');
      return { data, error: null };
    } catch (error) {
      toast.error(error.message);
      return { data: null, error };
    }
  };

  const signInWithGoogle = async (credentialResponse) => {
    try {
      const { user: googleUser, token, error } = await googleAuthService.handleGoogleLogin(
        credentialResponse
      );
      if (error) throw error;

      googleAuthService.storeSession(googleUser, token);
      setUser(googleUser);
      setSession(token);
      setAuthProvider('google');
      toast.success(`Welcome ${googleUser.name}!`);
      return { user: googleUser, error: null };
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Failed to sign in with Google');
      return { user: null, error };
    }
  };

  const signOut = async () => {
    try {
      if (authProvider === 'google') {
        googleAuthService.clearSession();
      } else if (authProvider === 'supabase') {
        const { error } = await authHelpers.signOut();
        if (error) throw error;
      }
      setUser(null);
      setSession(null);
      setAuthProvider(null);
      toast.success('Signed out successfully!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    user,
    loading,
    session,
    authProvider,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

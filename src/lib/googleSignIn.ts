"use server";

import { signIn, signOut } from "@/auth";

export const handleGoogleSignIn = async () => {
  try {
    await signIn("google");
  } catch (error) {
    throw error;
  }
};

export const handleGoogleSignOut = async () => {
  try {
    await signOut();
  } catch (error) {
    throw error;
  }
};
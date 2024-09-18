"use client";

import { FcGoogle } from "react-icons/fc";
import { useTransition, useState } from "react";
import { handleGoogleSignIn } from "@/lib/googleSignIn";
import { handleEmailSignIn } from "@/lib/emailSignIn";

export const SignInPage: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({ email: "" as string });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevents the form from submitting and reloading the page, allowing us to handle the submission in TypeScript.
    try {
      startTransition(async () => {
        await handleEmailSignIn(formData.email);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div >
      <div className="min-w-[400px] min-h-fit shadow-md px-4 py-6 rounded-md">
        <h2 className="text-2xl py-4">Sign In</h2>
        <div className="form-container">
          <div className="social-logins">
            <button className="py-2 px-2 flex items-center gap-4 border-2 w-full rounded-lg border-red-800" onClick={() => handleGoogleSignIn()}>
              <FcGoogle className="google-icon" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
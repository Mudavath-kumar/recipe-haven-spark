
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export interface AuthSignUpData {
  email: string;
  password: string;
  name: string;
}

export interface AuthSignInData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (data: AuthSignInData) => {
    try {
      setIsLoading(true);
      
      console.log("Starting login process with email:", data.email);
      
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.error("Authentication error details:", error);
        
        // Simplified error handling
        toast.error(error.message || "Login failed. Please check your credentials and try again.");
        return false;
      }

      if (authData.user) {
        console.log("Login successful for user:", authData.user.id);
        toast.success("Login successful!");
        navigate("/");
        return true;
      } else {
        console.error("No error but authData.user is null:", authData);
        toast.error("Something went wrong. Please try again.");
        return false;
      }
    } catch (error) {
      console.error("Unexpected login error:", error);
      toast.error("An unexpected error occurred during login");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (data: AuthSignUpData) => {
    try {
      setIsLoading(true);
      
      console.log("Starting signup process with email:", data.email);
      
      // Sign up without email confirmation
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
          },
          // No email redirect - bypassing confirmation
        },
      });

      if (error) {
        console.error("Signup error details:", error);
        if (error.message.includes("already registered")) {
          toast.error("This email is already registered. Please try logging in instead.");
        } else {
          toast.error(error.message);
        }
        return false;
      }

      if (authData.user) {
        console.log("Account created successfully. User:", authData.user.id);
        
        // Automatically sign in after signup
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        
        if (signInError) {
          console.error("Auto login error details:", signInError);
          toast.error("Account created but couldn't log in automatically. Please log in manually.");
          navigate("/login");
          return true;
        } else {
          console.log("Auto login successful. Session:", signInData.session?.user.id);
          toast.success("Account created and logged in successfully!");
          navigate("/");
          return true;
        }
      } else {
        console.error("No error but authData.user is null:", authData);
        toast.error("Something went wrong during account creation. Please try again.");
        return false;
      }
    } catch (error) {
      console.error("Unexpected signup error:", error);
      toast.error("An unexpected error occurred during signup");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const checkSession = async () => {
    const { data } = await supabase.auth.getSession();
    return data.session;
  };

  return { signIn, signUp, checkSession, isLoading };
};

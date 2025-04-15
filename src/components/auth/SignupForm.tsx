
import { useState } from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EyeIcon, EyeOffIcon, KeyIcon, MailIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AuthSignUpData, useAuth } from "@/hooks/useAuth";

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type SignupFormValues = z.infer<typeof signupSchema>;

export const SignupForm = () => {
  const { signUp, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    await signUp({
      name: data.name,
      email: data.email,
      password: data.password
    } as AuthSignUpData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <div className="relative">
                <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <FormControl>
                  <Input 
                    placeholder="John Doe" 
                    className="pl-10" 
                    {...field} 
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <div className="relative">
                <MailIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <FormControl>
                  <Input 
                    placeholder="your.email@example.com" 
                    className="pl-10" 
                    {...field} 
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className="relative">
                <KeyIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <FormControl>
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pl-10"
                    {...field} 
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-muted-foreground" />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <div className="relative">
                <KeyIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <FormControl>
                  <Input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pl-10"
                    {...field} 
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-muted-foreground" />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-medium cursor-pointer">
                  I accept the <Link to="/terms" className="text-green-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-green-600 hover:underline">Privacy Policy</Link>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full mt-6 bg-green-600 hover:bg-green-700"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
};

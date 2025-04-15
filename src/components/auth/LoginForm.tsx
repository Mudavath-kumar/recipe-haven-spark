
import { useState } from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EyeIcon, EyeOffIcon, KeyIcon, MailIcon } from "lucide-react";
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
import { AuthSignInData, useAuth } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { signIn, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await signIn(data as AuthSignInData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
        
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-medium cursor-pointer">
                  Remember me
                </FormLabel>
              </FormItem>
            )}
          />
          
          <Link to="/forgot-password" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline">
            Forgot password?
          </Link>
        </div>
        
        <Button 
          type="submit" 
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
};

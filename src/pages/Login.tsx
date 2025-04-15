
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { KeyIcon } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { checkSession } = useAuth();
  
  // Check if user is already logged in
  useEffect(() => {
    const verifySession = async () => {
      const session = await checkSession();
      if (session) {
        navigate("/");
      }
    };
    
    verifySession();
  }, [navigate, checkSession]);

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-gray-950 px-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="space-y-3 pb-6">
          <div className="flex flex-col items-center space-y-2">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-2">
              <KeyIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center text-base">
              Enter your credentials to access your account
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t pt-6">
          <div className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline font-medium">
              Create account
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;


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
import { UserIcon } from "lucide-react";
import { SignupForm } from "@/components/auth/SignupForm";
import { useAuth } from "@/hooks/useAuth";

const Signup = () => {
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
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-b from-green-50 to-white px-4 py-10">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="space-y-3 pb-6">
          <div className="flex flex-col items-center space-y-2">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-2">
              <UserIcon className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-center">Create your account</CardTitle>
            <CardDescription className="text-center text-base">
              Enter your information to get started with CulinaryDelight
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <SignupForm />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t pt-6">
          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:text-green-800 hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;

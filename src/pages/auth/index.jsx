import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useUser } from "@/context/AuthContext";
import { handleLogin, handleRegister } from "@/services/auth";
import React from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate("/dashboard");

  const { setUserInfo } = useUser();

  const onLogin = async (data) => {
    const toastId = toast.loading("Logging in...");
    try {
      const response = await handleLogin(data, setUserInfo);
      if (response.success) {
        toast.success("Login successful!", { id: toastId });
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.msg, { id: toastId });
    }
  };

  const onRegister = async (data) => {
    const toastId = toast.loading("Logging in...");
    try {
      const response = await handleRegister(data);
      if (response.success) {
        toast.success("Successful! Please Login!!!", { id: toastId });
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.msg, { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-sm border border-gray-200 rounded-2xl bg-white">
        <CardHeader>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="login" className="cursor-pointer">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="cursor-pointer">
                Register
              </TabsTrigger>
            </TabsList>

            {/* Login */}
            <TabsContent value="login">
              <CardTitle className="text-center text-2xl font-medium tracking-tight mb-4">
                Sign in to your account
              </CardTitle>
              <CardContent className="space-y-5 px-0">
                <Login onLogin={onLogin} />
              </CardContent>
            </TabsContent>

            {/* Register */}
            <TabsContent value="register">
              <CardTitle className="text-center text-2xl font-medium tracking-tight mb-4">
                Create a new account
              </CardTitle>
              <CardContent className="space-y-5 px-0">
                <Register onRegister={onRegister} />
              </CardContent>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>

      <Toaster position="top-center" richColors />
    </div>
  );
};

export default Auth;

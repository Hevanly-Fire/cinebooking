"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast({
          title: "Error",
          description: "Invalid Credentials",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Login successful!",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during login",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <Toaster />
      <Card className="w-96">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button className="w-full mt-4" type="submit">
              Login
            </Button>
          </form>
          <div className="text-sm text-muted-foreground text-center">
            Don't have an account? <Link href="/register" className="text-primary">Sign up</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

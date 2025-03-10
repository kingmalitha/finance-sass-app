import {
  SignIn,
  ClerkLoaded,
  ClerkLoading,
} from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* SIGN IN FORM */}
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-[#2E2A47]">
            Welcome Back!
          </h1>
          <p className="text-base text-[#7E8CA0]">
            Log in or Create account to get back to your
            dashboard!
          </p>
        </div>

        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignIn />
          </ClerkLoaded>

          <ClerkLoading>
            <Loader2
              size="3rem"
              className="animate-spin text-muted-foreground"
            />
          </ClerkLoading>
        </div>
      </div>

      {/* LOGO */}
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image
          src="/logo.svg"
          width={400}
          height={400}
          alt="logo"
        />
      </div>
    </div>
  );
}

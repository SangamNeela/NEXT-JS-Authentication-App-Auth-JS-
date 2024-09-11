import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-center bg-gradient-to-r from-indigo-500">
      <div className="space-y-6 text-center">
        <h1 className="text-5xl font-extrabold">🔐Auth</h1>
        <p className="text-2xl font-semibold">A Simple Authentication Service</p>
        <div>
            <LoginButton>
              <Button size="lg" className="font-semibold">
                <Link href="/auth/login">Sign in</Link>
              </Button>
            </LoginButton>
        </div>
      </div>
    </main>
  );
}

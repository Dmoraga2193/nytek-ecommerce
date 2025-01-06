import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Login | Nytek",
  description: "Login to your Nytek account",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 lg:grid lg:grid-cols-2 lg:gap-4">
      <div className="relative hidden h-full w-full lg:flex lg:flex-col lg:items-center lg:justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/login_registro_2.webp"
            alt="Login and registration background"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
            className="object-center"
          />
          {/* Overlay semi-transparente para mejorar legibilidad */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-white">
          <div className="mb-8 flex flex-col items-center rounded-xl bg-black/30 p-6 backdrop-blur-sm">
            <Image
              src="/logo_nytek.jpeg"
              alt="Nytek Logo"
              width={80}
              height={80}
              className="mb-4 rounded-md"
            />
            <h2 className="mb-2 text-3xl font-bold tracking-tight">
              Bienvenido a Nytek
            </h2>
          </div>
        </div>
      </div>
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md sm:p-8 lg:p-10">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Image
            src="/logo_nytek.jpeg"
            alt="Nytek Logo"
            width={60}
            height={60}
            className="mb-2 rounded-full lg:hidden"
          />
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Bienvenido de vuelta
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Ingresa tus credenciales para acceder a tu cuenta
          </p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-muted-foreground sm:text-base">
          ¿No tienes una cuenta?{" "}
          <Link
            href="/register"
            className="font-medium underline underline-offset-4 hover:text-primary"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}

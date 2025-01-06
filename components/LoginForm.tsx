"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Icons } from "@/components/ui/icons";
import GoogleButton from "react-google-button";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success("Inicio de sesión exitoso");
      router.push("/");
    } catch {
      toast.error("Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              placeholder="nombre@ejemplo.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11"
            />
          </div>
        </div>
        <Button
          disabled={isLoading}
          type="submit"
          className="w-full h-11 text-base"
        >
          {isLoading && <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />}
          Iniciar sesión
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-4 text-muted-foreground">
            O continúa con
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <GoogleButton
          type="dark"
          label="Continuar con Google"
          disabled={isLoading}
          onClick={() => {
            setIsLoading(true);
            loginWithGoogle()
              .catch((error) => {
                console.error("Error logging in with Google:", error);
                toast.error("Error al iniciar sesión con Google");
              })
              .finally(() => setIsLoading(false));
          }}
          style={{ width: "100%", borderRadius: "0.375rem" }}
        />
      </div>
    </div>
  );
}

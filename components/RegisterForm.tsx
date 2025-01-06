"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Icons } from "@/components/ui/icons";
import { Eye, EyeOff } from "lucide-react";
import GoogleButton from "react-google-button";

type PasswordStrength = "muy-debil" | "regular" | "fuerte";

const PasswordStrengthIndicator = ({
  strength,
}: {
  strength: PasswordStrength;
}) => {
  const colors = {
    "muy-debil": "bg-red-500",
    regular: "bg-yellow-500",
    fuerte: "bg-green-500",
  };

  const texts = {
    "muy-debil": "Contraseña muy débil",
    regular: "Contraseña regular",
    fuerte: "Contraseña fuerte",
  };

  return (
    <div className="mt-2">
      <div className="h-2 w-full bg-gray-200 rounded-full">
        <div
          className={`h-full rounded-full ${colors[strength]} transition-all duration-300 ease-in-out`}
          style={{
            width:
              strength === "muy-debil"
                ? "33.33%"
                : strength === "regular"
                ? "66.66%"
                : "100%",
          }}
        ></div>
      </div>
      <p className={`text-sm mt-1 ${colors[strength].replace("bg-", "text-")}`}>
        {texts[strength]}
      </p>
    </div>
  );
};

export function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrength>("muy-debil");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, loginWithGoogle } = useAuth();

  const checkPasswordStrength = (password: string): PasswordStrength => {
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    const mediumRegex =
      /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

    if (strongRegex.test(password)) {
      return "fuerte";
    } else if (mediumRegex.test(password)) {
      return "regular";
    } else {
      return "muy-debil";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    setIsLoading(true);
    try {
      await register(formData.email, formData.password);
      toast.success("Registro exitoso");
    } catch {
      toast.error("Error al registrarse");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              name="name"
              placeholder="Juan Pérez"
              type="text"
              autoCapitalize="words"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
              value={formData.name}
              onChange={handleChange}
              required
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Nombre de usuario</Label>
            <Input
              id="username"
              name="username"
              placeholder="juanperez"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
              value={formData.username}
              onChange={handleChange}
              required
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              name="email"
              placeholder="nombre@ejemplo.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={formData.email}
              onChange={handleChange}
              required
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                autoCapitalize="none"
                autoComplete="new-password"
                disabled={isLoading}
                value={formData.password}
                onChange={handleChange}
                required
                className="h-11"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {formData.password && (
              <PasswordStrengthIndicator strength={passwordStrength} />
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar contraseña</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                name="confirmPassword"
                placeholder="••••••••"
                type={showConfirmPassword ? "text" : "password"}
                autoCapitalize="none"
                autoComplete="new-password"
                disabled={isLoading}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="h-11"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 text-base"
        >
          {isLoading && <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />}
          Crear cuenta
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-4 text-muted-foreground">
            O regístrate con
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <GoogleButton
          type="dark"
          disabled={isLoading}
          label="Continuar con Google"
          onClick={() => {
            setIsLoading(true);
            loginWithGoogle()
              .catch((error) => {
                console.error("Error registering with Google:", error);
                toast.error("Error al registrarse con Google");
              })
              .finally(() => setIsLoading(false));
          }}
          style={{ width: "100%", borderRadius: "0.375rem" }}
        />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

function LoadingUI() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md p-8">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin" />
          <p className="mt-4 text-lg font-medium">Cargando...</p>
        </div>
      </Card>
    </div>
  );
}

function WebpayResult() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();

  const confirmPayment = useCallback(async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const token = searchParams.get("token_ws");

      if (!token) {
        throw new Error("No token found in URL");
      }

      const response = await fetch("/api/webpay/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Payment confirmation result:", result);

      if (result.responseCode === 0) {
        if (status !== "success") {
          // Only clear cart and show toast if not already successful
          setStatus("success");
          clearCart();
          toast.success("Pago realizado con éxito");
        }
      } else {
        throw new Error(`Payment failed with code: ${result.responseCode}`);
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      setStatus("error");
      toast.error("Error al confirmar el pago");
    } finally {
      setIsProcessing(false);
    }
  }, [searchParams, clearCart, isProcessing, status]);

  useEffect(() => {
    let mounted = true;

    const processPayment = async () => {
      if (mounted) {
        await confirmPayment();
      }
    };

    processPayment();

    return () => {
      mounted = false;
    };
  }, [confirmPayment]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md p-8">
        {status === "loading" && (
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin" />
            <p className="mt-4 text-lg font-medium">Procesando tu pago...</p>
          </div>
        )}
        {status === "success" && (
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h1 className="mt-4 text-2xl font-bold">¡Pago exitoso!</h1>
            <p className="mt-2 text-gray-600">
              Tu pedido ha sido procesado correctamente.
            </p>
            <Button
              className="mt-6"
              onClick={() => router.push("/mis-pedidos")}
            >
              Ver mis pedidos
            </Button>
          </div>
        )}
        {status === "error" && (
          <div className="text-center">
            <XCircle className="mx-auto h-16 w-16 text-red-500" />
            <h1 className="mt-4 text-2xl font-bold">Error en el pago</h1>
            <p className="mt-2 text-gray-600">
              Hubo un problema al procesar tu pago. Por favor, intenta
              nuevamente.
            </p>
            <Button className="mt-6" onClick={() => router.push("/checkout")}>
              Volver al checkout
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

export default function WebpayResultPage() {
  return (
    <Suspense fallback={<LoadingUI />}>
      <WebpayResult />
    </Suspense>
  );
}

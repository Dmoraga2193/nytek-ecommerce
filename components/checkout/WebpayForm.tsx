import { useState } from "react";
import { Icons } from "@/components/ui/icons";
import { CreditCard, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface WebpayFormProps {
  amount: number;
  onSubmit: () => Promise<{ token: string; formAction: string }>;
}

export function WebpayForm({ amount, onSubmit }: WebpayFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { token, formAction } = await onSubmit();

      const form = document.createElement("form");
      form.method = "POST";
      form.action = formAction;

      const tokenInput = document.createElement("input");
      tokenInput.type = "hidden";
      tokenInput.name = "token_ws";
      tokenInput.value = token;

      form.appendChild(tokenInput);
      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Error initiating Webpay transaction:", error);
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full p-6 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01] group relative overflow-hidden"
      >
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-white/10 backdrop-blur-sm p-3">
              <CreditCard className="h-6 w-6" />
            </div>
            <div className="text-left">
              <p className="text-lg font-semibold">Pagar con Webpay</p>
              <p className="text-sm text-white/90">
                Tarjeta de crédito o débito
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold">
              ${amount.toLocaleString()}
            </span>
            {isLoading ? (
              <Icons.spinner className="h-6 w-6 animate-spin" />
            ) : (
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            )}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-blue-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>
    </motion.div>
  );
}

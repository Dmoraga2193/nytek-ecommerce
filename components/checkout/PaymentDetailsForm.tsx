"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { WebpayForm } from "./WebpayForm";
import { Building2, ShieldCheck, ArrowLeft, Copy } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const formSchema = z.object({
  paymentMethod: z.enum(["transferencia", "mercadopago", "webpay"]),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
});

interface PaymentDetailsFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  onBack: () => void;
  totalPrice: number;
  onWebpaySubmit: () => Promise<{ token: string; formAction: string }>;
}

const bankInfo = {
  bankName: "Banco Estado",
  accountType: "Cuenta Corriente",
  accountNumber: "123456789",
  rut: "76.543.210-K",
  accountHolder: "Nytek SpA",
  email: "pagos@nytek.cl",
};

export function PaymentDetailsForm({
  onSubmit,
  onBack,
  totalPrice,
  onWebpaySubmit,
}: PaymentDetailsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentButton, setShowPaymentButton] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: "transferencia",
      termsAccepted: false,
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      onSubmit(data);
      setShowPaymentButton(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (showPaymentButton) {
      setShowPaymentButton(false);
    } else {
      onBack();
    }
  };

  const copyToClipboard = (e: React.MouseEvent, text: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    toast.success("Copiado al portapapeles");
  };

  const paymentMethods = [
    {
      id: "transferencia",
      title: "Transferencia Bancaria",
      description: "Transferencia directa a nuestra cuenta",
      icon: <Building2 className="h-5 w-5 text-blue-600" />,
    },
    {
      id: "mercadopago",
      title: "MercadoPago",
      description: "Paga con tarjeta o saldo de MercadoPago",
      icon: (
        <div className="relative h-5 w-5">
          <Image
            src="/footer/mercadopago.png"
            alt="MercadoPago"
            fill
            className="object-contain"
          />
        </div>
      ),
    },
    {
      id: "webpay",
      title: "Webpay",
      description: "Paga con tarjeta de crédito o débito",
      icon: (
        <div className="relative h-5 w-5">
          <Image
            src="/footer/logo-webpay.png"
            alt="Webpay"
            fill
            className="object-contain"
          />
        </div>
      ),
    },
  ];

  const BankDetails = () => (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-lg font-semibold mb-4">Información Bancaria</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Banco:</span>
            <div className="flex items-center gap-2">
              <span className="font-medium">{bankInfo.bankName}</span>
              <button
                onClick={(e) => copyToClipboard(e, bankInfo.bankName)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Tipo de Cuenta:</span>
            <div className="flex items-center gap-2">
              <span className="font-medium">{bankInfo.accountType}</span>
              <button
                onClick={(e) => copyToClipboard(e, bankInfo.accountType)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Número de Cuenta:</span>
            <div className="flex items-center gap-2">
              <span className="font-medium">{bankInfo.accountNumber}</span>
              <button
                onClick={(e) => copyToClipboard(e, bankInfo.accountNumber)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">RUT:</span>
            <div className="flex items-center gap-2">
              <span className="font-medium">{bankInfo.rut}</span>
              <button
                onClick={(e) => copyToClipboard(e, bankInfo.rut)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Titular:</span>
            <div className="flex items-center gap-2">
              <span className="font-medium">{bankInfo.accountHolder}</span>
              <button
                onClick={(e) => copyToClipboard(e, bankInfo.accountHolder)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Email:</span>
            <div className="flex items-center gap-2">
              <span className="font-medium">{bankInfo.email}</span>
              <button
                onClick={(e) => copyToClipboard(e, bankInfo.email)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-100 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-blue-800">
                Monto a transferir:
              </span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-blue-800">
                  ${totalPrice.toLocaleString()}
                </span>
                <button
                  onClick={(e) => copyToClipboard(e, totalPrice.toString())}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Método de Pago
        </h2>
        <p className="text-muted-foreground">
          Selecciona tu método de pago preferido
        </p>
      </div>

      <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-100">
        <div className="flex items-center gap-2 text-blue-600 mb-4">
          <ShieldCheck className="h-6 w-6" />
          <span className="text-sm font-medium">Pago Seguro</span>
        </div>

        <AnimatePresence mode="wait">
          {!showPaymentButton ? (
            <motion.div
              initial={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormControl>
                          <div className="space-y-2">
                            {paymentMethods.map((method) => (
                              <div key={method.id}>
                                <div
                                  className={cn(
                                    "relative flex items-center rounded-lg border-2 p-4 cursor-pointer transition-all duration-200",
                                    selectedMethod === method.id
                                      ? "border-blue-600 bg-blue-50"
                                      : "border-gray-200 hover:border-gray-300"
                                  )}
                                  onClick={() => {
                                    setSelectedMethod(method.id);
                                    field.onChange(method.id);
                                  }}
                                >
                                  <div className="flex flex-1 items-center gap-3">
                                    {method.icon}
                                    <div>
                                      <p className="font-medium">
                                        {method.title}
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        {method.description}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="ml-4 shrink-0">
                                    <div
                                      className={cn(
                                        "h-4 w-4 rounded-full border-2 transition-all duration-200",
                                        selectedMethod === method.id
                                          ? "border-4 border-blue-600"
                                          : "border-gray-300"
                                      )}
                                    />
                                  </div>
                                </div>
                                {method.id === "transferencia" &&
                                  selectedMethod === "transferencia" && (
                                    <BankDetails />
                                  )}
                              </div>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-blue-100 bg-blue-50/50 p-4 transition-all duration-200 hover:bg-blue-50">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-blue-200 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <p className="text-sm text-blue-900">
                            Al realizar el pedido, aceptas nuestros{" "}
                            <a
                              href="#"
                              className="font-medium text-blue-600 hover:text-blue-700 underline underline-offset-4"
                            >
                              términos
                            </a>{" "}
                            y{" "}
                            <a
                              href="#"
                              className="font-medium text-blue-600 hover:text-blue-700 underline underline-offset-4"
                            >
                              condiciones de servicio
                            </a>
                            .
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="px-6 h-12 border border-gray-200 hover:bg-gray-50 rounded-xl transition-all duration-300 flex items-center gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Volver
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !selectedMethod}
                      className="px-8 h-12 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-medium rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
                    >
                      Confirmar Pedido
                    </Button>
                  </div>
                </form>
              </Form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="px-6 h-12 border border-gray-200 hover:bg-gray-50 rounded-xl transition-all duration-300 flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Volver
                </Button>
              </div>
              {selectedMethod === "webpay" && (
                <WebpayForm amount={totalPrice} onSubmit={onWebpaySubmit} />
              )}
              {/* Implement other payment method forms here */}
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { PersonalInfoForm } from "@/components/checkout/PersonalInfoForm";
import { ShippingAddressForm } from "@/components/checkout/ShippingAddressForm";
import { PaymentDetailsForm } from "@/components/checkout/PaymentDetailsForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Steps } from "@/components/checkout/Steps";

const steps = [
  { id: 1, name: "Datos Personales" },
  { id: 2, name: "Dirección de Envío" },
  { id: 3, name: "Detalles de Pago" },
] as const;

// Types for form data
type PersonalInfoData = {
  name: string;
  email: string;
  phone: string;
};

type ShippingAddressData = {
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

type PaymentDetailsData = {
  paymentMethod: "transferencia" | "mercadopago" | "webpay";
  termsAccepted: boolean;
};

interface CheckoutData {
  personalInfo?: PersonalInfoData;
  shippingAddress?: ShippingAddressData;
  paymentDetails?: PaymentDetailsData;
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({});
  const { cart, totalPrice } = useCart();
  const { user } = useAuth();

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePersonalInfoSubmit = (data: PersonalInfoData) => {
    setCheckoutData((prev) => ({ ...prev, personalInfo: data }));
    handleNextStep();
  };

  const handleShippingAddressSubmit = (data: ShippingAddressData) => {
    setCheckoutData((prev) => ({ ...prev, shippingAddress: data }));
    handleNextStep();
  };

  const handlePaymentDetailsSubmit = (data: PaymentDetailsData) => {
    setCheckoutData((prev) => ({ ...prev, paymentDetails: data }));
    console.log("Datos completos del checkout:", {
      ...checkoutData,
      paymentDetails: data,
    });
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 mt-[120px]">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">Acceso Denegado</h1>
          <p>Por favor, inicia sesión para acceder al proceso de pago.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 mt-[120px]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Finalizar Compra
            </h1>
            <p className="text-gray-600">
              Complete los siguientes pasos para finalizar su pedido
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <Card className="border-0 shadow-lg">
                <div className="p-6 sm:p-8">
                  <Steps steps={steps} currentStep={currentStep} />
                  <div className="mt-12">
                    {currentStep === 1 && (
                      <PersonalInfoForm onSubmit={handlePersonalInfoSubmit} />
                    )}
                    {currentStep === 2 && (
                      <ShippingAddressForm
                        onSubmit={handleShippingAddressSubmit}
                        onBack={handlePrevStep}
                      />
                    )}
                    {currentStep === 3 && (
                      <PaymentDetailsForm
                        onSubmit={handlePaymentDetailsSubmit}
                        onBack={handlePrevStep}
                      />
                    )}
                  </div>
                </div>
              </Card>
            </div>
            <div className="lg:col-span-4">
              <div className="sticky top-[140px]">
                <OrderSummary cart={cart} totalPrice={totalPrice} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

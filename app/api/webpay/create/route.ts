import { NextResponse } from "next/server";

const WEBPAY_API_URL =
  process.env.NODE_ENV === "production"
    ? "https://webpay3g.transbank.cl"
    : "https://webpay3gint.transbank.cl";

// Test credentials
const COMMERCE_CODE = "597055555532";
const API_KEY =
  "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C";

export async function POST(req: Request) {
  try {
    const { amount, orderId } = await req.json();

    const response = await fetch(
      `${WEBPAY_API_URL}/rswebpaytransaction/api/webpay/v1.2/transactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Tbk-Api-Key-Id": COMMERCE_CODE,
          "Tbk-Api-Key-Secret": API_KEY,
        },
        body: JSON.stringify({
          buy_order: orderId,
          session_id: orderId,
          amount: amount,
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/webpay/result`,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Webpay error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      throw new Error("Failed to create Webpay transaction");
    }

    const data = await response.json();

    // Return the token and form action URL
    return NextResponse.json({
      token: data.token,
      formAction: `${WEBPAY_API_URL}/webpayserver/initTransaction`,
    });
  } catch (error) {
    console.error("Error creating Webpay transaction:", error);
    return NextResponse.json(
      { error: "Failed to create Webpay transaction" },
      { status: 500 }
    );
  }
}

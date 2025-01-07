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
    const { token } = await req.json();

    if (!token) {
      throw new Error("Token is required");
    }

    const response = await fetch(
      `${WEBPAY_API_URL}/rswebpaytransaction/api/webpay/v1.2/transactions/${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Tbk-Api-Key-Id": COMMERCE_CODE,
          "Tbk-Api-Key-Secret": API_KEY,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Webpay confirmation error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      throw new Error("Failed to confirm Webpay transaction");
    }

    const data = await response.json();
    return NextResponse.json({
      status: data.status,
      amount: data.amount,
      buyOrder: data.buy_order,
      transactionDate: data.transaction_date,
      cardNumber: data.card_detail?.card_number,
      paymentTypeCode: data.payment_type_code,
      responseCode: data.response_code,
    });
  } catch (error) {
    console.error("Error confirming Webpay transaction:", error);
    return NextResponse.json(
      { error: "Failed to confirm Webpay transaction" },
      { status: 500 }
    );
  }
}

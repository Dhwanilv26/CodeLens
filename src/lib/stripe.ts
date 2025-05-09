"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

// no error now
export async function createCheckoutSession(credits: number) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    billing_address_collection: "required", 
    customer_creation: "always", 

    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `${credits} Codelens Credits`,
          },
          unit_amount: Math.round((credits / 50) * 75 * 100),
        },
        quantity: 1,
      },
    ],

    mode: "payment",

    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/create`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,

    client_reference_id: userId.toString(),

    metadata: {
      credits,
    },
  });

  return redirect(session.url!);
}

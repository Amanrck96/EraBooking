"use server";

import { suggestAlternativeTimes, type SuggestAlternativeTimesInput } from "@/ai/flows/smart-time-suggestions";
import { sendBookingEmail, type SendBookingEmailInput } from "@/ai/flows/send-booking-email-flow";

export async function getSmartSuggestions(input: SuggestAlternativeTimesInput) {
  try {
    // In a real app, you might add more logic here, like checking salon opening hours
    // or staff availability before calling the AI.
    console.log("Calling Genkit flow with input:", input);
    const suggestions = await suggestAlternativeTimes(input);
    console.log("Received suggestions from Genkit:", suggestions);
    return { success: true, data: suggestions };
  } catch (error) {
    console.error("Error in getSmartSuggestions server action:", error);
    return { success: false, error: "An unexpected error occurred while fetching suggestions." };
  }
}

export async function sendConfirmationEmail(input: SendBookingEmailInput) {
  try {
    console.log("Calling sendBookingEmail flow with input:", input);
    const result = await sendBookingEmail(input);
    console.log("Received result from sendBookingEmail flow:", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in sendConfirmationEmail server action:", error);
    return { success: false, error: "An unexpected error occurred while sending the email." };
  }
}

"use server";

import { suggestAlternativeTimes, type SuggestAlternativeTimesInput } from "@/ai/flows/smart-time-suggestions";

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

'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting alternative appointment times when the user's preferred time is unavailable.
 *
 * - suggestAlternativeTimes - A function that suggests alternative time slots.
 * - SuggestAlternativeTimesInput - The input type for the suggestAlternativeTimes function.
 * - SuggestAlternativeTimesOutput - The return type for the suggestAlternativeTimes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAlternativeTimesInputSchema = z.object({
  serviceId: z.string().describe('The ID of the service to be booked.'),
  staffId: z.string().nullable().describe('The ID of the staff member, or null if any staff is acceptable.'),
  preferredStartTime: z.string().describe('The user\u2019s preferred start time in HH:MM format.'),
  date: z.string().describe('The date for which the appointment is requested in ISO format (YYYY-MM-DD).'),
  customerName: z.string().describe('The name of the customer.'),
  customerPhone: z.string().describe('The phone number of the customer.'),
  customerEmail: z.string().describe('The email address of the customer.'),
});
export type SuggestAlternativeTimesInput = z.infer<typeof SuggestAlternativeTimesInputSchema>;

const SuggestAlternativeTimesOutputSchema = z.object({
  suggestedTimeSlots: z.array(
    z.object({
      startTime: z.string().describe('Suggested start time in HH:MM format.'),
      endTime: z.string().describe('Suggested end time in HH:MM format.'),
    })
  ).describe('An array of suggested time slots.'),
});
export type SuggestAlternativeTimesOutput = z.infer<typeof SuggestAlternativeTimesOutputSchema>;

export async function suggestAlternativeTimes(input: SuggestAlternativeTimesInput): Promise<SuggestAlternativeTimesOutput> {
  return suggestAlternativeTimesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAlternativeTimesPrompt',
  input: {schema: SuggestAlternativeTimesInputSchema},
  output: {schema: SuggestAlternativeTimesOutputSchema},
  prompt: `You are a helpful assistant for Era Unisex Salon, designed to suggest alternative appointment times to customers when their preferred time is unavailable.

  The customer has requested a {{serviceId}} appointment with {{staffId ? staffId : 'any available staff'}} on {{date}} but the time {{preferredStartTime}} is unavailable.
  The customer's contact information is:
  - Name: {{customerName}}
  - Phone: {{customerPhone}}
  - Email: {{customerEmail}}

  Suggest three alternative time slots, taking into account service duration, staff availability, and buffer times. Provide only the start and end times for each suggestion in HH:MM format. Ensure that the suggested times are within the salon's operating hours (9:00 to 18:00 Asia/Kolkata time). Consider lead time and booking cut-off rules.

  Ensure the suggested times are available and do not overlap with existing bookings. Return the output as a JSON array of objects, each containing startTime and endTime.
  `,
});

const suggestAlternativeTimesFlow = ai.defineFlow(
  {
    name: 'suggestAlternativeTimesFlow',
    inputSchema: SuggestAlternativeTimesInputSchema,
    outputSchema: SuggestAlternativeTimesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

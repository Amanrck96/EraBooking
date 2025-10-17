'use server';
/**
 * @fileOverview This file defines a Genkit flow for sending booking confirmation emails.
 *
 * - sendBookingEmail - A function that sends a booking confirmation email.
 * - SendBookingEmailInput - The input type for the sendBookingEmail function.
 * - SendBookingEmailOutput - The return type for the sendBookingEmail function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {BookingData} from '@/lib/types';

const SendBookingEmailInputSchema = z.object({
    bookingDetails: z.any().describe('The booking details.'),
    customerEmail: z.string().describe('The email address of the customer.'),
    salonEmail: z.string().describe('The email address of the salon.'),
  });

export type SendBookingEmailInput = z.infer<typeof SendBookingEmailInputSchema>;

const SendBookingEmailOutputSchema = z.object({
  success: z.boolean(),
});
export type SendBookingEmailOutput = z.infer<typeof SendBookingEmailOutputSchema>;


export async function sendBookingEmail(input: SendBookingEmailInput): Promise<SendBookingEmailOutput> {
  return sendBookingEmailFlow(input);
}

const prompt = ai.definePrompt({
  name: 'sendBookingEmailPrompt',
  input: {schema: SendBookingEmailInputSchema},
  output: {schema: SendBookingEmailOutputSchema},
  prompt: `You are an email sending service. You are sending a booking confirmation email.
  
  Booking Details:
  Booking ID: {{bookingDetails.bookingId}}
  Service: {{bookingDetails.service.name}}
  Staff: {{bookingDetails.staff.name}}
  Date: {{bookingDetails.date}}
  Time: {{bookingDetails.time}}
  Customer: {{bookingDetails.customer.name}}
  
  Send a confirmation email to the customer at {{customerEmail}} and a notification to the salon at {{salonEmail}}.
  
  The email to the customer should be a confirmation of their booking with all the details.
  The email to the salon should be a notification of the new booking with all the details.
  
  Return { "success": true } if the emails are sent successfully. In a real app this would send an email. For now, we just log it.
  `,
});

const sendBookingEmailFlow = ai.defineFlow(
  {
    name: 'sendBookingEmailFlow',
    inputSchema: SendBookingEmailInputSchema,
    outputSchema: SendBookingEmailOutputSchema,
  },
  async input => {
    console.log('Sending booking email with input:', input);
    const {output} = await prompt(input);
    console.log('Email sending simulation result:', output);
    // In a real application, this is where you would integrate with an email service like SendGrid, Resend, etc.
    return output || { success: false };
  }
);

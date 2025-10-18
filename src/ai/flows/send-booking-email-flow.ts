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
import {sendEmail, formatBookingEmailHtml} from '@/lib/email';

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

const sendBookingEmailFlow = ai.defineFlow(
  {
    name: 'sendBookingEmailFlow',
    inputSchema: SendBookingEmailInputSchema,
    outputSchema: SendBookingEmailOutputSchema,
  },
  async input => {
    console.log('Sending booking email with input:', input);
    
    try {
      // Send email to customer
      const customerEmailHtml = await formatBookingEmailHtml(input.bookingDetails, true);
      const customerEmailSent = await sendEmail({
        to: input.customerEmail,
        subject: 'Your Appointment Confirmation',
        html: customerEmailHtml
      });
      
      // Send email to salon
      const salonEmailHtml = await formatBookingEmailHtml(input.bookingDetails, false);
      const salonEmailSent = await sendEmail({
        to: input.salonEmail,
        subject: 'New Appointment Booking',
        html: salonEmailHtml
      });
      
      const success = customerEmailSent && salonEmailSent;
      console.log('Email sending result:', { customerEmailSent, salonEmailSent, success });
      
      return { success };
    } catch (error) {
      console.error('Error in email sending flow:', error);
      return { success: false };
    }
  }
);

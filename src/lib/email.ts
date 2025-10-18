'use server';

import nodemailer from 'nodemailer';

// Create a transporter for sending emails
// For production, you would use your actual SMTP credentials
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'amanrck69@gmail.com', // fallback for development
    pass: process.env.EMAIL_PASSWORD || 'dxkk dhss uxqh jcms', // fallback for development
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'amanrck96@gmail.com',
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export async function formatBookingEmailHtml(bookingDetails: any, isCustomer: boolean): Promise<string> {
  const { bookingId, service, staff, date, time, customer } = bookingDetails;
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
      <h2 style="color: #333; text-align: center; margin-bottom: 20px;">
        ${isCustomer ? 'Your Appointment is Confirmed!' : 'New Appointment Booking'}
      </h2>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
        <p style="margin: 5px 0;"><strong>Booking ID:</strong> ${bookingId}</p>
        <p style="margin: 5px 0;"><strong>Service:</strong> ${service?.name || 'N/A'}</p>
        <p style="margin: 5px 0;"><strong>Staff:</strong> ${staff?.name || 'N/A'}</p>
        <p style="margin: 5px 0;"><strong>Date:</strong> ${date || 'N/A'}</p>
        <p style="margin: 5px 0;"><strong>Time:</strong> ${time || 'N/A'}</p>
        <p style="margin: 5px 0;"><strong>Customer:</strong> ${customer?.name || 'N/A'}</p>
        <p style="margin: 5px 0;"><strong>Phone:</strong> ${customer?.phone || 'N/A'}</p>
        <p style="margin: 5px 0;"><strong>Email:</strong> ${customer?.email || 'N/A'}</p>
        ${customer?.notes ? `<p style="margin: 5px 0;"><strong>Notes:</strong> ${customer.notes}</p>` : ''}
      </div>
      
      ${isCustomer ? `
        <p style="margin-bottom: 15px;">Thank you for booking with us. We look forward to seeing you!</p>
        <p style="margin-bottom: 15px;">If you need to reschedule or cancel your appointment, please contact us at least 24 hours in advance.</p>
      ` : `
        <p style="margin-bottom: 15px;">A new appointment has been booked. Please review the details above.</p>
      `}
      
      <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
        <p>Era Unisex Salon</p>
        <p>123 Main Street, City, Country</p>
        <p>Phone: (123) 456-7890</p>
      </div>
    </div>
  `;
}
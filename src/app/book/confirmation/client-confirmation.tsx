"use client";

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, CalendarPlus, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

function ConfirmationContent() {
  const [bookingId, setBookingId] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get('bookingId');
    if (id) {
      setBookingId(id);
    } else {
      // Fallback for direct navigation
      setBookingId(Math.random().toString(36).substring(2, 10).toUpperCase());
    }
  }, [searchParams]);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md text-center shadow-2xl">
        <CardHeader>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
            className="mx-auto bg-green-100 dark:bg-green-900/50 rounded-full p-4 w-fit"
          >
            <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
          </motion.div>
          <CardTitle className="mt-4 text-2xl">Appointment Confirmed!</CardTitle>
          <CardDescription>Thank you! Your appointment is booked.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-primary/10 border-2 border-dashed border-primary/30 rounded-lg py-2">
            <p className="text-sm text-muted-foreground">Booking ID</p>
            <p className="font-mono text-xl font-bold tracking-widest text-primary">{bookingId || '...'}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            You will receive an email and SMS confirmation shortly with your booking details.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button variant="outline">
              <CalendarPlus className="mr-2 h-4 w-4" />
              Add to Google Calendar
            </Button>
            <Button variant="outline">
              <Phone className="mr-2 h-4 w-4" />
              Call Salon
            </Button>
          </div>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ClientConfirmation() {
  return (
    <Suspense fallback={<div>Loading confirmation...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
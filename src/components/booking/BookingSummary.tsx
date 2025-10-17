"use client";

import type { BookingData } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Scissors, User, Users, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";

type BookingSummaryProps = {
  bookingData: BookingData;
};

export default function BookingSummary({ bookingData }: BookingSummaryProps) {
  const { service, staff, date, time, customer } = bookingData;

  if (!service || !date || !time) {
    return <div className="text-center text-destructive">Something went wrong. Please start over.</div>;
  }
  
  const ServiceIcon = service.icon || Scissors;
  const formattedDate = date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-center">
      <h2 className="text-xl font-semibold mb-1">Confirm Your Appointment</h2>
      <p className="text-muted-foreground mb-6">Please review your booking details below.</p>
      <Card className="max-w-lg mx-auto text-left">
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
          <CardDescription>Your appointment at Era Unisex Salon</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between p-4 bg-secondary/50 rounded-lg">
            <div className="flex items-center gap-4">
              <ServiceIcon className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold">{service.name}</p>
                <p className="text-sm text-muted-foreground">{service.durationMinutes} minutes</p>
              </div>
            </div>
            <p className="font-semibold flex items-center"><IndianRupee className="h-4 w-4 mr-1" />{service.price}</p>
          </div>

          <div className="flex items-center gap-4">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <p>{formattedDate}</p>
          </div>

          <div className="flex items-center gap-4">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <p className="font-semibold text-lg">{time}</p>
          </div>
          
          <div className="flex items-center gap-4">
            {staff ? (
              <>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={staff.avatarUrl} alt={staff.name} data-ai-hint={staff.avatarHint} />
                  <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground">With</p>
                  <p className="font-semibold">{staff.name}</p>
                </div>
              </>
            ) : (
              <>
                <Users className="h-5 w-5 text-muted-foreground" />
                <p>With <span className="font-semibold">Any Available</span> specialist</p>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-4 border-t pt-4 mt-4">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-semibold">{customer.name}</p>
              <p className="text-sm text-muted-foreground">{customer.email} • {customer.phone}</p>
            </div>
          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}

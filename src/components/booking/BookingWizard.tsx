"use client";

import { useState } from "react";
import type { BookingData } from "@/lib/types";
import { services, staff } from "@/lib/data";
import StepIndicator from "@/components/booking/StepIndicator";
import ServiceSelector from "@/components/booking/ServiceSelector";
import StaffSelector from "@/components/booking/StaffSelector";
import DateTimePicker from "@/components/booking/DateTimePicker";
import CustomerForm from "@/components/booking/CustomerForm";
import BookingSummary from "@/components/booking/BookingSummary";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { sendConfirmationEmail } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

const steps = ["Service", "Staff", "Date & Time", "Details", "Confirm"];

export function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState<BookingData>({
    service: null,
    staff: null,
    date: null,
    time: null,
    customer: { name: "", email: "", phone: "", notes: "" },
  });
  const router = useRouter();
  const { toast } = useToast();

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const goToStep = (step: number) => {
    if(step < currentStep) {
      setCurrentStep(step);
    }
  }

  const handleSubmit = async () => {
    console.log("Final Booking Data:", bookingData);
    
    // Here you would typically call an API to save the booking
    
    if (bookingData.customer.email) {
      const { service, ...restOfBookingData } = bookingData;
      const { icon, ...restOfService } = service || {};
      
      const serializableBookingData = {
        ...restOfBookingData,
        service: service ? restOfService : null,
      };

      const emailInput = {
        bookingDetails: serializableBookingData,
        customerEmail: bookingData.customer.email,
        salonEmail: "eraunisexsalon@gmail.com", // Salon's email
      };
      const result = await sendConfirmationEmail(emailInput);
      if (!result.success) {
        toast({
          variant: "destructive",
          title: "Email Error",
          description: result.error || "Could not send confirmation email.",
        });
        // We can still proceed to confirmation page even if email fails
      }
    }
    
    router.push("/book/confirmation");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ServiceSelector services={services} onSelect={(service) => { updateBookingData({ service }); nextStep(); }} />;
      case 1:
        return <StaffSelector staff={staff} selectedStaff={bookingData.staff} onSelect={(staff) => { updateBookingData({ staff }); nextStep(); }} />;
      case 2:
        return <DateTimePicker bookingData={bookingData} onSelect={(date, time) => { updateBookingData({ date, time }); nextStep(); }} />;
      case 3:
        return <CustomerForm currentData={bookingData.customer} onUpdate={(customer) => { updateBookingData({ customer }); nextStep(); }} />;
      case 4:
        return <BookingSummary bookingData={bookingData} />;
      default:
        return null;
    }
  };
  
  const motionVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="flex flex-col gap-8">
      <StepIndicator steps={steps} currentStep={currentStep} goToStep={goToStep} />
      <div className="relative overflow-hidden min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={motionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
      {(currentStep > 0 && currentStep < steps.length) && (
        <div className={`flex ${currentStep > 0 ? 'justify-between' : 'justify-end'} items-center`}>
          <Button variant="ghost" onClick={prevStep}>Back</Button>
          {currentStep === steps.length - 1 && (
            <Button onClick={handleSubmit} size="lg">Confirm Booking</Button>
          )}
        </div>
      )}
    </div>
  );
}

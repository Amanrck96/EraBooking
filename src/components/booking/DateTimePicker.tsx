"use client";

import { useState, useMemo } from "react";
import type { BookingData, SuggestAlternativeTimesOutput } from "@/lib/types";
import { timeSlots } from "@/lib/data";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Wand2 } from "lucide-react";
import { getSmartSuggestions } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

type DateTimePickerProps = {
  bookingData: BookingData;
  onSelect: (date: Date, time: string) => void;
};

const UNAVAILABLE_CUSTOM_TIME = "14:00"; // Simulate this time as unavailable

export default function DateTimePicker({ bookingData, onSelect }: DateTimePickerProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customTime, setCustomTime] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isCustomTimeAvailable, setIsCustomTimeAvailable] = useState<boolean | null>(null);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestAlternativeTimesOutput['suggestedTimeSlots']>([]);

  const { toast } = useToast();

  const availableSlots = useMemo(() => {
    return timeSlots.map(slot => ({
      time: slot,
      available: Math.random() > 0.3 && slot !== "12:30", 
    }));
  }, [date]);

  const handleCustomTimeCheck = async () => {
    setIsChecking(true);
    setSuggestions([]);
    await new Promise(res => setTimeout(res, 1000));
    const isAvailable = customTime !== UNAVAILABLE_CUSTOM_TIME;
    setIsCustomTimeAvailable(isAvailable);
    setIsChecking(false);
  };

  const handleGetSuggestions = async () => {
    if (!date || !bookingData.service) return;
    setIsSuggesting(true);
    const input = {
      serviceId: bookingData.service.id,
      staffId: bookingData.staff?.id || null,
      preferredStartTime: customTime,
      date: date.toISOString().split('T')[0],
      customerName: "Valued Customer",
      customerEmail: "email@example.com",
      customerPhone: "1234567890"
    };

    const result = await getSmartSuggestions(input);
    if (result.success && result.data) {
      setSuggestions(result.data.suggestedTimeSlots);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "Could not fetch suggestions.",
      });
    }
    setIsSuggesting(false);
  };

  const handleSelectSlot = (time: string) => {
    if (date) {
      setSelectedTime(time);
      onSelect(date, time);
    }
  };
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
      <h2 className="text-center text-xl font-semibold mb-1">Select Date & Time</h2>
      <p className="text-center text-muted-foreground mb-6">Choose a date and an available time slot.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            disabled={(d) => d < new Date(new Date().setDate(new Date().getDate() - 1))}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold">Available Slots for {date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-2">
            {availableSlots.map(({ time, available }) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                disabled={!available}
                onClick={() => handleSelectSlot(time)}
              >
                {time}
              </Button>
            ))}
          </div>
          <div className="text-center text-sm text-muted-foreground my-2">-- OR --</div>
          <div>
            <Label htmlFor="custom-time">Can't find a slot? Enter your preferred time</Label>
            <div className="flex gap-2 mt-2">
              <Input id="custom-time" type="time" value={customTime} onChange={e => { setCustomTime(e.target.value); setIsCustomTimeAvailable(null); setSuggestions([]); }} />
              <Button onClick={handleCustomTimeCheck} disabled={isChecking || !customTime}>
                {isChecking ? <Loader2 className="animate-spin" /> : "Check"}
              </Button>
            </div>
            {isChecking && <p className="text-sm text-muted-foreground mt-2">Checking availability...</p>}
            {isCustomTimeAvailable === true && <Alert className="mt-4 border-green-500 text-green-700 dark:border-green-600 dark:text-green-400"><AlertDescription>Great! {customTime} is available. Click to select.</AlertDescription><Button variant="link" onClick={() => handleSelectSlot(customTime)}>{customTime}</Button></Alert>}
            {isCustomTimeAvailable === false && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>
                  Sorry, {customTime} is not available.
                  <Button variant="link" onClick={handleGetSuggestions} disabled={isSuggesting} className="ml-2 p-0 h-auto text-destructive-foreground/80 hover:text-white">
                    {isSuggesting ? <Loader2 className="animate-spin mr-2"/> : <Wand2 className="mr-2 h-4 w-4"/>}
                    Let AI find alternatives?
                  </Button>
                </AlertDescription>
              </Alert>
            )}
            {suggestions.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-sm mb-2">We found these slots for you:</h4>
                <div className="flex gap-2 flex-wrap">
                  {suggestions.map(slot => (
                    <Button key={slot.startTime} variant="outline" onClick={() => handleSelectSlot(slot.startTime)}>
                      {slot.startTime}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

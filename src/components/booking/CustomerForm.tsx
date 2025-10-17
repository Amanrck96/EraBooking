"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  notes: z.string().optional(),
});

type CustomerFormProps = {
  currentData: z.infer<typeof formSchema>;
  onUpdate: (data: z.infer<typeof formSchema>) => void;
};

export default function CustomerForm({ currentData, onUpdate }: CustomerFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: currentData,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onUpdate(values);
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
      <h2 className="text-center text-xl font-semibold mb-1">Your Details</h2>
      <p className="text-center text-muted-foreground mb-6">Just a few more details to confirm your appointment.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl><Input placeholder="john.doe@example.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl><Input placeholder="+91 12345 67890" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="notes" render={({ field }) => (
            <FormItem>
              <FormLabel>Optional Notes</FormLabel>
              <FormControl><Textarea placeholder="Any special requests or notes..." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <div className="flex justify-end pt-4">
            <Button type="submit">Proceed to Confirmation</Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}

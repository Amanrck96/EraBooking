"use client";

import type { Service } from "@/lib/types";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

type ServiceSelectorProps = {
  services: Service[];
  onSelect: (service: Service) => void;
};

export default function ServiceSelector({ services, onSelect }: ServiceSelectorProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h2 className="text-xl font-semibold mb-1">Choose a Service</h2>
      <p className="text-muted-foreground mb-6">Select one of our premium services to get started.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Card
              key={service.id}
              onClick={() => onSelect(service)}
              className="cursor-pointer transition-all hover:shadow-lg hover:border-primary hover:scale-105"
            >
              <CardHeader className="flex flex-col items-center text-center gap-3">
                <div className="rounded-full bg-primary/10 p-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-base">{service.name}</CardTitle>
                <CardDescription className="text-xs">{service.durationMinutes} min • ₹{service.price}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </motion.div>
  );
}

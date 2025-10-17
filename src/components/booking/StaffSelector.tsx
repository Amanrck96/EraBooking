"use client";

import type { Staff } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type StaffSelectorProps = {
  staff: Staff[];
  selectedStaff: Staff | null;
  onSelect: (staff: Staff | null) => void;
};

export default function StaffSelector({ staff, selectedStaff, onSelect }: StaffSelectorProps) {
  const allStaffOptions = [{ id: "any", name: "Any Available", avatarUrl: "", avatarHint: "" }, ...staff];

  const handleSelect = (member: Staff | null) => {
    onSelect(member);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="text-center"
    >
      <h2 className="text-xl font-semibold mb-1">Choose a Specialist</h2>
      <p className="text-muted-foreground mb-6">You can pick a preferred specialist or we'll assign one for you.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {allStaffOptions.map((member) => {
          const isSelected = (selectedStaff === null && member.id === 'any') || (selectedStaff?.id === member.id);
          return (
            <div key={member.id} className="relative">
              <Card
                onClick={() => handleSelect(member.id === 'any' ? null : member as Staff)}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-lg hover:border-primary hover:scale-105",
                  isSelected && "border-primary ring-2 ring-primary"
                )}
              >
                <CardHeader className="flex flex-col items-center text-center gap-3 p-4">
                  <Avatar className="w-20 h-20">
                    {member.avatarUrl ? (
                      <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint={member.avatarHint} />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center rounded-full">
                        <Users className="w-10 h-10 text-primary" />
                      </div>
                    )}
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold text-sm">{member.name}</p>
                </CardHeader>
              </Card>
              {isSelected && (
                <div className="absolute top-2 right-2 bg-background rounded-full">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

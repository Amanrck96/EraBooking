import type { LucideIcon } from 'lucide-react';
import type {suggestAlternativeTimes} from '@/ai/flows/smart-time-suggestions';

export type Service = {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  icon: LucideIcon;
};

export type Staff = {
  id: string;
  name: string;
  avatarUrl: string;
  avatarHint: string;
};

export type BookingData = {
  service: Service | null;
  staff: Staff | null;
  date: Date | null;
  time: string | null;
  customer: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  };
};

export type SuggestAlternativeTimesOutput = Awaited<ReturnType<typeof suggestAlternativeTimes>>;

import { Scissors, Hand, Sparkles, Gem, Wand, Droplets } from 'lucide-react';
import type { Service, Staff } from './types';
import { PlaceHolderImages } from './placeholder-images';

const staff1 = PlaceHolderImages.find(p => p.id === 'staff1');
const staff2 = PlaceHolderImages.find(p => p.id === 'staff2');
const staff3 = PlaceHolderImages.find(p => p.id === 'staff3');

export const services: Service[] = [
  { id: 's1', name: 'Haircut & Styling', description: 'A classic cut and style for a fresh new look.', durationMinutes: 60, price: 500, icon: Scissors },
  { id: 's2', name: 'Manicure & Pedicure', description: 'Complete nail care for your hands and feet.', durationMinutes: 90, price: 750, icon: Hand },
  { id: 's3', name: 'Facial Treatment', description: 'A relaxing facial to rejuvenate your skin.', durationMinutes: 60, price: 800, icon: Sparkles },
  { id: 's4', name: 'Bridal Makeup', description: 'Stunning makeup for your special day.', durationMinutes: 120, price: 5000, icon: Gem },
  { id: 's5', name: 'Beard Grooming', description: 'Trimming and styling for a sharp beard.', durationMinutes: 30, price: 300, icon: Wand },
  { id: 's6', name: 'Hair Spa', description: 'Deep conditioning treatment for healthy hair.', durationMinutes: 75, price: 900, icon: Droplets },
];

export const staff: Staff[] = [
  { id: 'st1', name: 'Alex Johnson', avatarUrl: staff1?.imageUrl || '', avatarHint: staff1?.imageHint || 'hairstylist portrait' },
  { id: 'st2', name: 'Maria Garcia', avatarUrl: staff2?.imageUrl || '', avatarHint: staff2?.imageHint || 'barber portrait' },
  { id: 'st3', name: 'Sam Williams', avatarUrl: staff3?.imageUrl || '', avatarHint: staff3?.imageHint || 'esthetician portrait' },
];

export const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
];

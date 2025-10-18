import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, CalendarPlus, Phone } from 'lucide-react';
import ClientConfirmation from './client-confirmation';

// Make this page statically generated
export const dynamic = 'error';
export const dynamicParams = false;

// Generate static params for build
export function generateStaticParams() {
  return [{}];
}

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <ClientConfirmation />
    </div>
  );
}

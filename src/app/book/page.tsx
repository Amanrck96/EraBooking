import { BookingWizard } from '@/components/booking/BookingWizard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BookAppointmentPage() {
  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <Card className="w-full shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">Book Your Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <BookingWizard />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

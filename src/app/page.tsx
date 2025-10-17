

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { services } from "@/lib/data";
import { ArrowRight, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
const instagramGalleryImage = PlaceHolderImages.find(p => p.id === 'gallery-instagram');

const testimonials = [
  { name: "Priya S.", quote: "Absolutely love my new haircut! The staff is so talented and friendly. Best salon in town!", avatar: "https://picsum.photos/seed/priya/40/40" },
  { name: "Rohan M.", quote: "Great experience. Professional service and a very relaxing atmosphere. I'll definitely be back for the beard grooming.", avatar: "https://picsum.photos/seed/rohan/40/40" },
  { name: "Anjali K.", quote: "My bridal makeup was flawless and lasted all night. They made me feel like a princess on my wedding day!", avatar: "https://picsum.photos/seed/anjali/40/40" },
];

const socialLinks = [
    { platform: "Instagram", url: "https://www.instagram.com/eraunisexsalon/p/C8_Z_2_y3EH/", icon: <Instagram className="h-8 w-8" />, type: "link" },
    { platform: "Facebook", url: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Feraunisexsalon%2Fposts%2Fpfbid024gYJg3L8iNfS7W1Xw2gG4w4c6zZ5hY5XbFqP7N3E6fBvDkKj9vWjE9xY8zJjJgJl", icon: <Facebook className="h-8 w-8" />, type: "embed" },
    { platform: "Facebook", url: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1216105823156682", icon: <Facebook className="h-8 w-8" />, type: "embed" },
    { platform: "Facebook", url: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1932323127516511", icon: <Facebook className="h-8 w-8" />, type: "embed" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <GallerySection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}

const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-14 items-center">
      <div className="mr-4 flex items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <svg role="img" viewBox="0 0 24 24" className="h-8 w-8 text-primary" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>Era Unisex Salon</title><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.182c5.42 0 9.818 4.398 9.818 9.818S17.42 21.818 12 21.818 2.182 17.42 2.182 12 6.58 2.182 12 2.182zm-2.909 3.83v1.84h5.818V6.012H9.091zm-1.03 2.759v8.4H10.8v-2.315h2.4v2.315h2.727v-8.4h-2.727v2.315h-2.4V8.77h-1.637zm1.03 3.23h1.637v2.314H8.061v-2.315z"></path></svg>
          <span className="font-bold">Era Booking</span>
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-end space-x-2">
        <Button asChild>
          <Link href="/book">Book Appointment</Link>
        </Button>
      </div>
    </div>
  </header>
);

const HeroSection = () => (
  <section className="relative h-[60vh] w-full md:h-[70vh]">
    {heroImage && (
      <Image
        src={heroImage.imageUrl}
        alt={heroImage.description}
        data-ai-hint={heroImage.imageHint}
        fill
        className="object-cover"
        priority
      />
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
    <div className="relative z-10 flex items-center justify-center text-center h-full">
      <div className="p-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl lg:text-7xl">
          Era Unisex Salon
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/90 drop-shadow-sm md:text-xl">
          Where Beauty Meets Elegance. Unisex • Affordable • Trendy
        </p>
        <div className="mt-8 flex justify-center">
          <Button size="lg" asChild className="text-lg">
            <Link href="/book">
              Book Your Appointment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

const ServicesSection = () => (
  <section className="py-16 sm:py-24">
    <div className="container">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Services</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          From trendy haircuts to relaxing spa treatments, we offer a wide range of services to make you look and feel your best.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.slice(0, 6).map((service) => {
          const Icon = service.icon;
          return (
            <Card key={service.id} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle>{service.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{service.durationMinutes} min • ₹{service.price}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="mt-12 text-center">
        <Button variant="outline" asChild>
          <Link href="/book">View All Services & Book <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  </section>
);

const GallerySection = () => (
    <section className="bg-secondary py-16 sm:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Work</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">A glimpse into the transformations we create.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {socialLinks.map((link, index) => (
            <div key={index} className="group relative aspect-[4/5] w-full overflow-hidden rounded-lg shadow-lg">
                {link.type === 'embed' ? (
                    <iframe 
                        src={link.url}
                        className="w-full h-full border-none overflow-hidden"
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    ></iframe>
                ) : (
                    instagramGalleryImage && (
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                             <Image
                                src={instagramGalleryImage.imageUrl}
                                alt={instagramGalleryImage.description}
                                data-ai-hint={instagramGalleryImage.imageHint}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                        </a>
                    )
                )}
                 <div className="absolute top-2 left-2 flex items-center gap-2 bg-background/80 text-foreground p-1 rounded-md">
                  {link.icon}
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

const TestimonialsSection = () => (
  <section className="py-16 sm:py-24">
    <div className="container">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Clients Say</h2>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.name} className="flex flex-col">
            <CardContent className="flex-1 pt-6">
              <p className="italic">"{testimonial.quote}"</p>
            </CardContent>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <p className="font-semibold">{testimonial.name}</p>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-secondary">
    <div className="container py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold">Era Unisex Salon</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Auto Plaza, OMH Road, Gowala Patty, <br />
            Cooch Behar, West Bengal, India
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <Phone className="h-4 w-4" /> <a href="tel:+919474903069">+91 94749 03069</a>
            </li>
            <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <Mail className="h-4 w-4" /> <a href="mailto:eraunisexsalon@gmail.com">eraunisexsalon@gmail.com</a>
            </li>
            <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <MapPin className="h-4 w-4" /> Cooch Behar, India
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="mt-2 flex space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://instagram.com/eraunisexsalon" target="_blank" rel="noopener noreferrer"><Instagram className="h-5 w-5" /></a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://www.facebook.com/photo.php?fbid=122136039470919677" target="_blank" rel="noopener noreferrer"><Facebook className="h-5 w-5" /></a>
            </Button>
          </div>
        </div>
      </div>
      <Separator className="my-8" />
      <div className="text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Era Booking. All rights reserved.
      </div>
    </div>
  </footer>
);

    
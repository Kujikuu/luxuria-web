// Contact.tsx
import AppLayout from "@/layouts/app-layout";
import { Head, useForm } from "@inertiajs/react";
import { Text } from "@/components/Typography";
import Tag from "@/components/Tag";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import HomeFaqs from "@/components/Home/HomeFaqs";
import { FormEventHandler } from "react";

interface ContactProps {
    success?: string;
}

export default function Contact({ success }: ContactProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        request_type: '',
        first_name: '',
        phone: '',
        email: '',
        message: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/contact-inquiries', {
            onSuccess: () => reset(),
        });
    };
    return (
        <AppLayout color='primary' section='hero'>
            <Head title="Contact" />

            {/* Hero Section */}
            <section id="hero" className="flex flex-col gap-10 relative pt-24 sm:pt-32 md:pt-52 -mt-24 bg-primary overflow-hidden w-full items-center justify-center">
                {/* Header */}
                <div className="flex flex-col gap-6 max-w-6xl w-full items-center">
                    <Text variant="heading2" className="w-full text-ui-1 text-center">Here to connect</Text>
                    <Text variant="bodyLarge" className="text-ui-2 text-center max-w-[400px]">Need help? Browse our FAQs for quick answers or reach out to us directly.</Text>
                </div>

                {/* Contact Form */}
                <form onSubmit={submit} className="flex flex-col gap-6 max-w-[600px] w-full items-center bg-ui-2 rounded-2xl p-6 z-10">
                    <div className="text-center mb-2">
                        <Text variant="heading3" className="text-text-primary mb-2">Send us a message</Text>
                        <Text variant="bodyMedium" className="text-text-secondary">We'll get back to you within 24 hours</Text>
                    </div>

                    {/* Success Message */}
                    {success && (
                        <div className="w-full p-4 bg-green-50 border border-green-200 rounded-lg">
                            <Text variant="bodyMedium" className="text-green-800">{success}</Text>
                        </div>
                    )}
                    
                    {/* Request Select */}
                    <div className="grid w-full items-center gap-3">
                        <Label htmlFor="request_type">Request Type</Label>
                        <Select value={data.request_type} onValueChange={(value) => setData('request_type', value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Request Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="buy">Buy Property</SelectItem>
                                <SelectItem value="sell">Sell Property</SelectItem>
                                <SelectItem value="rent">Consulting</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.request_type && (
                            <Text variant="bodySmall" className="text-red-500">{errors.request_type}</Text>
                        )}
                    </div>

                    {/* First Name & Phone Inputs */}
                    <div className="flex gap-6 w-full">
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="first_name">First Name</Label>
                            <Input 
                                id="first_name"
                                placeholder="First Name" 
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                            />
                            {errors.first_name && (
                                <Text variant="bodySmall" className="text-red-500">{errors.first_name}</Text>
                            )}
                        </div>
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="phone">Phone</Label>
                            <Input 
                                id="phone"
                                placeholder="Phone" 
                                type="tel" 
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                            />
                            {errors.phone && (
                                <Text variant="bodySmall" className="text-red-500">{errors.phone}</Text>
                            )}
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="grid w-full items-center gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                            id="email"
                            placeholder="Email" 
                            type="email" 
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && (
                            <Text variant="bodySmall" className="text-red-500">{errors.email}</Text>
                        )}
                    </div>

                    {/* Message Input */}
                    <div className="grid w-full items-center gap-3">
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                            id="message"
                            placeholder="Tell us about your requirements..." 
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            rows={4}
                        />
                        {errors.message && (
                            <Text variant="bodySmall" className="text-red-500">{errors.message}</Text>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full" disabled={processing}>
                        {processing ? 'Sending...' : 'Send Message'}
                    </Button>
                </form>

                {/* BG */}
                <div className="bg-ui-1 w-full h-80 absolute bottom-0 left-0 right-0">

                </div>
            </section>

            {/* Contact Details */}
            <section className="flex flex-col gap-6 sm:gap-8 md:gap-10 py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-10 items-center justify-center w-full">
                <div className="w-full max-w-6xl">
                    {/* Header */}
                    <div className="flex flex-col items-center text-center gap-6 mb-12">
                        <Tag text="Contact Info" />
                        <Text variant="heading2" className="text-text-primary">
                            Get In Touch
                        </Text>
                        <Text variant="bodyLarge" className="text-text-secondary max-w-2xl">
                            Ready to find your dream property or need expert real estate advice? We're here to help.
                        </Text>
                    </div>

                    {/* Contact Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Phone */}
                        <div className="flex flex-col items-center gap-4 p-6 bg-ui-2 rounded-2xl hover:bg-accent-primary/5 transition-colors">
                            <div className="w-12 h-12 bg-accent-primary/10 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <Text variant="heading4" className="text-text-primary mb-2">Phone</Text>
                                <Text variant="bodyMedium" className="text-text-secondary">+966 11 234 5678</Text>
                                <Text variant="bodyMedium" className="text-text-secondary">+966 50 123 4567</Text>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col items-center gap-4 p-6 bg-ui-2 rounded-2xl hover:bg-accent-primary/5 transition-colors">
                            <div className="w-12 h-12 bg-accent-primary/10 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <Text variant="heading4" className="text-text-primary mb-2">Email</Text>
                                <Text variant="bodyMedium" className="text-text-secondary">info@luxuria.sa</Text>
                                <Text variant="bodyMedium" className="text-text-secondary">sales@luxuria.sa</Text>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex flex-col items-center gap-4 p-6 bg-ui-2 rounded-2xl hover:bg-accent-primary/5 transition-colors">
                            <div className="w-12 h-12 bg-accent-primary/10 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <Text variant="heading4" className="text-text-primary mb-2">Address</Text>
                                <Text variant="bodyMedium" className="text-text-secondary">King Fahd Road</Text>
                                <Text variant="bodyMedium" className="text-text-secondary">Riyadh 12345, KSA</Text>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="flex flex-col items-center gap-4 p-6 bg-ui-2 rounded-2xl hover:bg-accent-primary/5 transition-colors">
                            <div className="w-12 h-12 bg-accent-primary/10 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <Text variant="heading4" className="text-text-primary mb-2">Follow Us</Text>
                                <div className="flex gap-2 justify-center">
                                    <a href="#" className="text-text-secondary hover:text-accent-primary transition-colors">
                                        <Text variant="bodyMedium">Instagram</Text>
                                    </a>
                                    <Text variant="bodyMedium" className="text-text-tertiary">•</Text>
                                    <a href="#" className="text-text-secondary hover:text-accent-primary transition-colors">
                                        <Text variant="bodyMedium">LinkedIn</Text>
                                    </a>
                                </div>
                                <div className="flex gap-2 justify-center mt-1">
                                    <a href="#" className="text-text-secondary hover:text-accent-primary transition-colors">
                                        <Text variant="bodyMedium">Twitter</Text>
                                    </a>
                                    <Text variant="bodyMedium" className="text-text-tertiary">•</Text>
                                    <a href="#" className="text-text-secondary hover:text-accent-primary transition-colors">
                                        <Text variant="bodyMedium">Facebook</Text>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Google map emebed container */}
            <section className="flex gap-6 sm:gap-8 md:gap-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 bg-ui-2 items-start justify-center w-full border-t border-b border-ui-3">
                <div className="w-full max-w-5xl h-[400px] px-4 sm:px-6 md:px-10">
                    <iframe
                        src="https://maps.google.com/maps?q=Riyadh%2C%20KSA&z=15&output=embed"
                        spellCheck={false}
                        aria-label="To enrich screen reader interactions, please activate Accessibility in Grammarly extension settings"
                        style={{ height: '100%', width: '100%', border: '0px' }}
                        className="rounded-xl overflow-hidden"
                    />
                </div>
            </section>

            {/* Faqs */}
            <HomeFaqs />
        </AppLayout>
    );
}
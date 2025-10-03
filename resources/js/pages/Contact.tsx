// Contact.tsx
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { Text } from "@/components/Typography";
import Tag from "@/components/Tag";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import HomeFaqs from "@/components/Home/HomeFaqs";

export default function Contact() {
    return (
        <AppLayout color='primary' section='hero'>
            <Head title="Contact" />

            {/* Hero Section */}
            <section id="hero" className="flex flex-col gap-10 relative pt-24 sm:pt-32 md:pt-52 -mt-20 pb-24 bg-primary overflow-hidden w-full items-center justify-center">
                {/* Header */}
                <div className="flex flex-col gap-6 max-w-6xl w-full items-center">
                    <Text variant="heading2" className="w-full text-ui-1 text-center">Here to connect</Text>
                    <Text variant="bodyLarge" className="text-ui-2 text-center max-w-[400px]">Need help? Browse our FAQs for quick answers or reach out to us directly.</Text>
                </div>

                {/* Contact Form */}
                <div className="flex flex-col gap-6 max-w-[600px] w-full items-center bg-ui-2 rounded-2xl p-6 z-10">
                    {/* Request Select */}
                    <div className="grid w-full items-center gap-3">
                        <Label htmlFor="request">Request Type</Label>
                        <Select value="" >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Request Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="buy">Buy Property</SelectItem>
                                <SelectItem value="sell">Sell Property</SelectItem>
                                <SelectItem value="rent">Consultating</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* First & Last Name Inputs */}
                    <div className="flex gap-6 w-full">
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="first-name">First Name</Label>
                            <Input placeholder="First Name" />
                        </div>
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="last-name">Phone</Label>
                            <Input placeholder="Phone" type="tel" />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="grid w-full items-center gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input placeholder="Email" type="email" />
                    </div>

                    {/* Message Input */}
                    <div className="grid w-full items-center gap-3">
                        <Label htmlFor="message">Message</Label>
                        <Textarea placeholder="Message" />
                    </div>

                    {/* Submit Button */}
                    <Button className="w-full">Submit</Button>
                </div>

                {/* BG */}
                <div className="bg-ui-1 w-full h-80 absolute bottom-0 left-0 right-0">

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
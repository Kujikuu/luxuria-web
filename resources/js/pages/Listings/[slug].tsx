import Tag from "@/components/Tag";
import { Text } from "@/components/Typography";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { LockLaminatedOpenIcon, MapPinIcon, NavigationArrowIcon } from "@phosphor-icons/react";
import Button from "@/components/Buttons/Button";
import { NavLink } from "@/components/Navigation/NavLink";

export default function ListingPage() {
    return (
        <AppLayout color='white' section='hero'>
            <Head title="Listing" />

            {/* Hero */}
            <section id="hero" className="flex flex-col gap-10 pt-48 px-4 sm:px-6 md:px-10 pb-24">
                {/* Go Back */}
                <div className="flex justify-between items-center">
                    <div>
                        <NavLink href="/properties" className="text-text-primary" arrow={true}>Go Back</NavLink>
                    </div>
                    
                </div>
                <Text variant="heading2" className="text-text-primary max-w-6xl" as="h1">Villa for Sale in Al Rawdah</Text>
                <img src="https://framerusercontent.com/images/rDUuK6TPTafFezTpUu0H4njdJ8.png?width=904&height=1200" alt="Listing" className="w-full max-w-6xl h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-2xl" />
                <div className="flex flex-col lg:flex-row w-full gap-6">
                    {/* Container */}
                    <div className="w-full h-fit gap-6 flex flex-col overflow-hidden">
                        {/* Tags */}
                        <Tag variant="secondary" text="For Rent" />
                        {/* Location */}
                        <div className="flex gap-2.5 items-center">
                            <MapPinIcon size={20} />
                            <Text variant="bodyLarge" className="text-text-primary">Al Rawdah, East Riyadh (Al Urouba Street)</Text>
                        </div>
                        {/* Description */}
                        <Text variant="bodyLarge" className="text-text-secondary">Spacious villa with multiple reception halls, outdoor kitchen, pool, maid’s room etc.</Text>
                        {/* Pricing */}
                        <div className="flex gap-2.5 items-center">
                            <Text variant="heading3" className="text-text-primary">6,500,000</Text>
                            <Text variant="bodyMedium" className="text-text-secondary">SAR</Text>
                        </div>
                        {/* CTA */}
                        <Button text="Request a quote" variant='secondary' href="/properties" />
                    </div>

                    {/* Details */}
                    <div className="w-full h-fit gap-6 flex flex-col p-4 sm:p-6 overflow-hidden bg-ui-2 border border-ui-3 rounded-2xl">
                        <Text variant="heading3" className="text-text-primary w-full">Details</Text>
                        <div className="flex flex-col gap-4">
                            {/* Size */}
                            <div className="flex py-6 items-center justify-between border-b border-ui-3">
                                <Text variant="bodyLarge" className="text-text-primary">Living space</Text>
                                <Text variant="bodyMedium" className="text-text-secondary">1200 sqm</Text>
                            </div>
                            {/* Completion Year */}
                            <div className="flex py-6 items-center justify-between border-b border-ui-3">
                                <Text variant="bodyLarge" className="text-text-primary">Completion year</Text>
                                <Text variant="bodyMedium" className="text-text-secondary">2022</Text>
                            </div>
                            {/* Floors */}
                            <div className="flex py-6 items-center justify-between border-b border-ui-3">
                                <Text variant="bodyLarge" className="text-text-primary">Floors</Text>
                                <Text variant="bodyMedium" className="text-text-secondary">2</Text>
                            </div>
                            {/* Bedrooms */}
                            <div className="flex py-6 items-center justify-between border-b border-ui-3">
                                <Text variant="bodyLarge" className="text-text-primary">Bedrooms</Text>
                                <Text variant="bodyMedium" className="text-text-secondary">2</Text>
                            </div>
                            {/* Bathrooms */}
                            <div className="flex py-6 items-center justify-between">
                                <Text variant="bodyLarge" className="text-text-primary">Bathrooms</Text>
                                <Text variant="bodyMedium" className="text-text-secondary">2</Text>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                <div className="flex flex-col w-full gap-6">
                    <img src="https://framerusercontent.com/images/rDUuK6TPTafFezTpUu0H4njdJ8.png?width=904&height=1200" alt="Listing" className="w-full max-w-6xl h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-2xl" />
                    <img src="https://framerusercontent.com/images/rDUuK6TPTafFezTpUu0H4njdJ8.png?width=904&height=1200" alt="Listing" className="w-full max-w-6xl h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-2xl" />
                </div>
            </section>
        </AppLayout>
    );
}
import ListingCard from "@/components/Cards/ListingCard";
import { Text } from "@/components/Typography";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

export default function ListingsPage() {
    return (
        <AppLayout color='white' section='hero'>
            <Head title="Listings" />

            {/* Hero */}
            <div className="flex flex-col items-center justify-center gap-10 pt-48 px-4 sm:px-6 md:px-10 pb-24">
                {/* Header */}
                <div className="flex flex-col lg:flex-row gap-6 max-w-6xl w-full">
                    <Text variant="heading2" className="w-full text-text-primary">Discover homes tailored to your unique way of living</Text>
                    <div className="flex gap-6 w-full items-start lg:items-end max-w-96 lg:justify-end">
                        <Text variant="bodyLarge" className="text-text-secondary">Step into a curated portfolio of breathtaking residences.</Text>
                    </div>
                </div>


                {/* Properties */}
                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 relative w-full">
                        <ListingCard
                            href="/link"
                            img="https://framerusercontent.com/images/rDUuK6TPTafFezTpUu0H4njdJ8.png?width=904&height=1200"
                            name="Villa for Sale in Al Rawdah"
                            price={6500000}
                            bed={2}
                            bath={2}
                            livingSpce={1200}
                        />
                        <ListingCard
                            href="/link"
                            img="https://framerusercontent.com/images/rDUuK6TPTafFezTpUu0H4njdJ8.png?width=904&height=1200"
                            name="Villa for Sale in Al Rawdah"
                            price={6500000}
                            bed={2}
                            bath={2}
                            livingSpce={1200}
                        />
                        <ListingCard
                            href="/link"
                            img="https://framerusercontent.com/images/rDUuK6TPTafFezTpUu0H4njdJ8.png?width=904&height=1200"
                            name="Villa for Sale in Al Rawdah"
                            price={6500000}
                            bed={2}
                            bath={2}
                            livingSpce={1200}
                        />
                        <ListingCard
                            href="/link"
                            img="https://framerusercontent.com/images/rDUuK6TPTafFezTpUu0H4njdJ8.png?width=904&height=1200"
                            name="Villa for Sale in Al Rawdah"
                            price={6500000}
                            bed={2}
                            bath={2}
                            livingSpce={1200}
                        />
                        <ListingCard
                            href="/link"
                            img="https://framerusercontent.com/images/rDUuK6TPTafFezTpUu0H4njdJ8.png?width=904&height=1200"
                            name="Villa for Sale in Al Rawdah"
                            price={6500000}
                            bed={2}
                            bath={2}
                            livingSpce={1200}
                        />
                        <ListingCard
                            href="/link"
                            img="https://framerusercontent.com/images/rDUuK6TPTafFezTpUu0H4njdJ8.png?width=904&height=1200"
                            name="Villa for Sale in Al Rawdah"
                            price={6500000}
                            bed={2}
                            bath={2}
                            livingSpce={1200}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
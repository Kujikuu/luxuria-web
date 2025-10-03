import Button from "../Buttons/Button";
import PropertyCard from "../Cards/PropertyCard";
import Tag from "../Tag";
import { Text } from "../Typography";

export default function HomeListings() {
    return (
        <section id="nav" className="flex flex-col relative gap-6 sm:gap-8 md:gap-10 px-4 py-8 sm:px-6 sm:py-12 md:pt-36 md:px-10 md:pb-24 items-center mx-auto">
            {/* Header */}
            <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 w-full h-fit">
                <Text variant="heading2" className="text-text-primary w-full text-center sm:text-left">
                    Find homes that perfectly match your lifestyle
                </Text>

                <div className="flex flex-col justify-start items-start xl:items-end w-full">
                    <Button text="View all" variant='secondary' href="/properties" />
                </div>
            </div>

            {/* Container */}
            <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 relative w-full">
                    <PropertyCard
                        href="/properties/link"
                        img="https://framerusercontent.com/images/rDUuK6TPTafFezTpUu0H4njdJ8.png?width=904&height=1200"
                        name="Villa for Sale in Al Rawdah"
                        price={6500000}
                        bed={2}
                        bath={2}
                        livingSpce={1200}
                    />
                    <PropertyCard
                        href="/properties/link"
                        img="https://framerusercontent.com/images/rDUuK6TPTafFezTpUu0H4njdJ8.png?width=904&height=1200"
                        name="Villa for Sale in Al Rawdah"
                        price={6500000}
                        bed={2}
                        bath={2}
                        livingSpce={1200}
                    />
                    <PropertyCard
                        href="/properties/link"
                        img="https://framerusercontent.com/images/rDUuK6TPTafFezTpUu0H4njdJ8.png?width=904&height=1200"
                        name="Villa for Sale in Al Rawdah"
                        price={6500000}
                        bed={2}
                        bath={2}
                        livingSpce={1200}
                    />
                    <PropertyCard
                        href="/properties/link"
                        img="https://framerusercontent.com/images/rDUuK6TPTafFezTpUu0H4njdJ8.png?width=904&height=1200"
                        name="Villa for Sale in Al Rawdah"
                        price={6500000}
                        bed={2}
                        bath={2}
                        livingSpce={1200}
                    />
                    <PropertyCard
                        href="/properties/link"
                        img="https://framerusercontent.com/images/rDUuK6TPTafFezTpUu0H4njdJ8.png?width=904&height=1200"
                        name="Villa for Sale in Al Rawdah"
                        price={6500000}
                        bed={2}
                        bath={2}
                        livingSpce={1200}
                    />
                    <PropertyCard
                        href="/properties/link"
                        img="https://framerusercontent.com/images/rDUuK6TPTafFezTpUu0H4njdJ8.png?width=904&height=1200"
                        name="Villa for Sale in Al Rawdah"
                        price={6500000}
                        bed={2}
                        bath={2}
                        livingSpce={1200}
                    />
                </div>
            </div>
        </section>
    );
}
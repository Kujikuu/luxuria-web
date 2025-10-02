import Button from "../Buttons/Button";
import ListingCard from "../Cards/ListingCard";
import Tag from "../Tag";
import { Text } from "../Typography";

export default function HomeListings() {
    return (
        <section id="nav" className="flex flex-col relative gap-10 px-3.5 py-10 md:pt-36 md:px-10 md:pb-24 items-center">
            {/* Header */}
            <div className="flex gap-6 w-full h-fit">
                <Text variant="heading2" className="text-text-primary w-full">
                    Find homes that perfectly match your lifestyle
                </Text>

                <div className="flex flex-col justify-end items-end w-full">
                    <Button text="View all" variant='secondary' />
                </div>
            </div>

            {/* Container */}
            <div className="flex gap-2.5">
                <div className="grid grid-cols-3 grow shrink-0 gap-6 relative">
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
        </section>
    );
}
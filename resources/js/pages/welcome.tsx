import { Head } from '@inertiajs/react';
import { Text } from '@/components/Typography';
import { NavLink } from '@/components/Navigation/NavLink';
import PhoneMenu from '@/components/Navigation/PhoneMenu';
import { delay, motion } from 'framer-motion';
import Header from '@/components/Navigation/Header';
import Footer from '@/components/Navigation/Footer';
import PrimaryButton from '@/components/Buttons/Button';
import ListingCard from '@/components/Cards/ListingCard';
import { BlogCardLarge, BlogCardMedium } from '@/components/Cards/BlogCard';
import AgentCard from '@/components/Cards/AgentCard';
import DetailCard from '@/components/Cards/DetailCard';
import FeatureCard from '@/components/Cards/FeatureCard';

const fadeInUp = {
    initial: { opacity: 0, y: 10, filter: 'blur(10px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, amount: 0.3 },
    transition: {
        type: "spring",
        stiffness: 400,
        damping: 80,
        mass: 1,
    }
};

export default function Welcome() {
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600" rel="stylesheet" />
            </Head>

            <div className='bg-primary'>
                <Header color='transparent' />

                <PrimaryButton href="/link" text="Click me" variant="primary" />          {/* icon shown */}
                <PrimaryButton href="/link" text="Click me" variant="secondary" icon />     {/* icon shown */}
                <PrimaryButton href="/link" text="Click me" variant="primary" icon={false} />  {/* no icon */}
                <PrimaryButton href="/link" text="Click me" variant="form" icon={false} />  {/* no icon */}

                {/* Hero Section */}
                <div className="min-h-screen flex flex-col items-center justify-center container mx-auto px-4">
                    <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.4 }}>
                        <Text variant='heading1' className="text-center text-ui-1 mb-6">Crafting Luxury Life</Text>
                    </motion.div>

                    <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.6 }}>
                        <Text variant="bodyMedium" className="text-center mb-4 text-ui-2">
                            Redefining real estate through excellence, innovation, and trust.
                        </Text>
                    </motion.div>

                    <ListingCard
                        href="/link"
                        img="https://framerusercontent.com/images/rDUuK6TPTafFezTpUu0H4njdJ8.png?width=904&height=1200"
                        name="Villa for Sale in Al Rawdah"
                        price={6500000}
                        bed={2}
                        bath={2}
                        livingSpce={1200}
                    />

                    <BlogCardLarge href="/blog/sample-post" />
                    <BlogCardMedium href="/blog/sample-post" />

                    <DetailCard
                        iconName="BuildingsIcon"
                        title="Luxury Villa"
                        description="Beautiful villa with ocean view"
                    />

                    <FeatureCard
                        iconName="CarIcon"
                        title="Parking Space"
                        description="With deep knowledge of the local market, we understand the nuances of every neighborhood."
                    />

                    <AgentCard href="/agents/john-doe" title='John Doe' img="https://placehold.co/150" role='Real Estate Agent' />
                </div>

                <Footer />
            </div>
        </>
    );
}

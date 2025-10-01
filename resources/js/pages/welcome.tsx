import { Head } from '@inertiajs/react';
import { Text } from '@/components/Typography';
import { NavLink } from '@/components/Navigation/NavLink';
import PhoneMenu from '@/components/Navigation/PhoneMenu';
import { delay, motion } from 'framer-motion';

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

            {/* Hero Section */}
            <div className="min-h-screen flex flex-col items-center justify-center container mx-auto px-4">
                <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.4 }}>
                    <Text variant="heading1" className="text-center mb-6">Crafting Luxury Life</Text>
                </motion.div>

                <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.6 }}>
                    <Text variant="bodyMedium" color="text-blue-500" className="text-center mb-4">
                        Redefining real estate through excellence, innovation, and trust.
                    </Text>
                </motion.div>
            </div>
        </>
    );
}

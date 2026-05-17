import { useTranslations } from '@/hooks/useLocalization';
import { DownloadSimpleIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import Button from '../Buttons/Button';
import { Text } from '../Typography';

const fadeInUp = {
    initial: { opacity: 0, y: 10, filter: 'blur(10px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, amount: 0.3 },
    transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 80,
        mass: 1,
    },
};

export default function HomeHero() {
    const { t } = useTranslations('pages');
    return (
        <section
            id="hero"
            className="relative -mt-24 flex w-full flex-col items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#123846_0%,#1d789f_58%,rgba(73,167,222,0)_100%)] pt-24 sm:pt-32 md:pt-52"
        >
            <div className="relative flex w-full flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10">
                {/* Text */}
                <div className="relative flex w-full flex-col items-center justify-center gap-4 px-4 text-center sm:gap-5 sm:px-6 md:gap-6 md:px-10">
                    <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.4 }}>
                        <Text variant="heading1" className="max-w-[280px] text-ui-1 sm:max-w-[400px] md:max-w-[700px]">
                            {t('home_hero_title') || 'Crafting Luxury Life'}
                        </Text>
                    </motion.div>
                    <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.6 }}>
                        <Text variant="bodyMedium" className="max-w-[280px] text-primary-soft sm:max-w-[350px] md:max-w-[440px]">
                            {t('home_hero_subtitle') || 'Redefining real estate through excellence, innovation, and trust.'}
                        </Text>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        {...fadeInUp}
                        transition={{ ...fadeInUp.transition, delay: 0.8 }}
                        className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
                    >
                        <Button
                            text={t('explore_more') || 'Explore more'}
                            onClick={() => window.scrollTo({ top: document.getElementById('nav')?.offsetTop || 0, behavior: 'smooth' })}
                        />
                        <Button
                            text={t('download_profile') || 'Company Profile'}
                            href="/storage/luxuria-company-profile.pdf"
                            download="LUXURIA-Company-Profile.pdf"
                            variant="outline"
                            icon={<DownloadSimpleIcon />}
                        />
                    </motion.div>
                </div>

                {/* Image */}
                <div className="relative w-full items-center">
                    <div className="absolute right-0 bottom-0 left-0 h-full w-full bg-gradient-to-b from-ui-1/0 from-85% to-ui-1"></div>
                    <img src="/assets/images/hero-img.png" alt="Hero" className="w-full max-w-6xl justify-self-center object-cover" />
                </div>
            </div>
            {/* Clouds - Hidden on mobile for performance */}
            <img
                src="/assets/images/hero-cloud.png"
                alt="Clouds"
                className="absolute top-[567px] -left-[120px] hidden h-auto w-full opacity-70 bg-blend-screen select-none md:block"
            />
            <img
                src="/assets/images/hero-cloud.png"
                alt="Clouds"
                className="absolute top-[509px] -right-[170px] hidden h-auto w-full opacity-70 bg-blend-screen select-none md:block"
            />
            <img
                src="/assets/images/hero-cloud.png"
                alt="Clouds"
                className="absolute top-[658px] -right-[170px] hidden h-auto w-full opacity-70 bg-blend-screen select-none md:block"
            />
            <img
                src="/assets/images/hero-cloud.png"
                alt="Clouds"
                className="absolute top-[658px] -left-[390px] hidden h-auto w-full opacity-70 bg-blend-screen select-none md:block"
            />
            <img
                src="/assets/images/hero-cloud.png"
                alt="Clouds"
                className="absolute top-[609px] hidden h-auto w-full opacity-70 bg-blend-screen select-none md:block"
            />
        </section>
    );
}

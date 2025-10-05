import { Text } from "../Typography";
import { LuxuriaLogo } from "./LuxuriaLogo";
import { NavLink } from "./NavLink";
import { DotIcon, DownloadSimpleIcon } from "@phosphor-icons/react";
import { useLocale, useTranslations } from "@/hooks/useLocalization";
import { Button } from "../ui/button";

export default function Footer() {
    const { getLocalizedPath } = useLocale();
    const { t, isRtl } = useTranslations();
    return (
        <footer className="flex flex-col gap-6 md:px-10 md:pt-24 bg-primary text-ui-1 overflow-hidden px-3.5 pt-10 w-full">
            <div className="flex flex-col gap-11 p-0 max-w-7xl mx-auto md:min-h-96 w-full min-h-auto ">
                <div className="flex md:gap-11 md:flex-row gap-11 flex-col">
                    <div className="flex flex-col gap-6 w-full">
                        <LuxuriaLogo />
                        <div className="flex flex-col gap-4">
                            <Text variant='bodyMedium' className="max-w-96 text-ui-2">{t('footer_description') || 'At LUXURIA, we redefine real estate by blending innovation, professionalism, and luxury.'}</Text>
                            <div className="flex flex-col gap-2 mt-2">
                                <Text variant='bodySmall' className="text-ui-2">{t('download_company_profile') || 'Download Company Profile'}</Text>
                                <Button
                                    variant='link'
                                    size="sm"
                                    className="w-fit text-ui-1 hover:underline"
                                    asChild
                                >
                                    <a href="/storage/luxuria-company-profile.pdf" download="LUXURIA-Company-Profile.pdf" className="flex items-center gap-2">
                                        <DownloadSimpleIcon size={16} />
                                        {t('download_pdf') || 'Download PDF'}
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 grid-cols-2 gap-9 w-full">
                        <div className="flex flex-col gap-4">
                            <Text variant='bodyBold' className="text-ui-1">{t('main_pages') || 'Main Pages'}</Text>
                            <NavLink color="ui-1" href={'/'}>{t('home')}</NavLink>
                            <NavLink color="ui-1" href={'/properties'}>{t('properties')}</NavLink>
                            <NavLink color="ui-1" href={'/blog'}>{t('blog')}</NavLink>
                            <NavLink color="ui-1" href={'/about'}>{t('about')}</NavLink>
                            <NavLink color="ui-1" href={'/contact'}>{t('contact')}</NavLink>
                        </div>
                        {/* <div className="flex flex-col gap-4">
                            <Text variant='bodyBold' className="text-ui-1">Other Pages</Text>
                            <NavLink color="ui-1" href="/property">Property</NavLink>
                            <NavLink color="ui-1" href="/broker">Broker</NavLink>
                            <NavLink color="ui-1" href="/privacy-policy">Privacy Policy</NavLink>
                            <NavLink color="ui-1" href="/404">404</NavLink>
                        </div> */}
                        <div className="flex flex-col gap-4">
                            <Text variant='bodyBold' className="text-ui-1">{t('follow_us') || 'Follow Us'}</Text>
                            <NavLink color="ui-1" href="https://www.linkedin.com/company/luxuria/" target="_blank">Linkedin</NavLink>
                            <NavLink color="ui-1" href="https://www.instagram.com/luxuria/" target="_blank">Instagram</NavLink>
                            <NavLink color="ui-1" href="https://www.twitter.com/luxuria/" target="_blank">Twitter</NavLink>
                            <NavLink color="ui-1" href="https://www.youtube.com/luxuria/" target="_blank">Youtube</NavLink>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between py-6 flex-col items-center gap-6 md:flex-row md:justify-between md:gap-0">
                    <div className="flex">
                        <Text variant='bodyMedium' className="text-ui-2">{t('all_rights_reserved')}</Text>
                        <DotIcon size={24} />
                        <NavLink color="ui-2" href={'/privacy-policy'}>{t('privacy_policy')}</NavLink>
                    </div>
                    {/* <div className="flex gap-2">
                        <Text variant='bodyMedium' className="text-ui-2">{t('powered_by') || 'Powered by'}</Text>
                        <NavLink color="ui-2" href="https://afifistudio.com" target="_blank">{t('afifi_studio') || 'Afifi Studio'}</NavLink>
                    </div> */}
                </div>
            </div>
        </footer>
    );
}
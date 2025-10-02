import { Text } from "../Typography";
import { LuxuriaLogo } from "./LuxuriaLogo";
import { NavLink } from "./NavLink";
import { DotIcon } from "@phosphor-icons/react";

export default function Footer() {
    return (
        <footer className="flex flex-col gap-6 md:px-10 md:pt-24 bg-primary text-ui-1 overflow-hidden px-3.5 pt-10">
            <div className="flex flex-col gap-11 p-0 max-w-7xl mx-auto md:min-h-96 w-full min-h-auto ">
                <div className="flex md:gap-11 md:flex-row gap-11 flex-col">
                    <div className="flex flex-col gap-6 w-full">
                        <LuxuriaLogo />
                        <Text variant='bodyMedium' className="text-color-ui-2 max-w-96">At LUXURIA, we redefine real estate by blending innovation, professionalism, and luxury.</Text>
                    </div>
                    <div className="grid md:grid-cols-3 grid-cols-2 gap-9 w-full">
                        <div className="flex flex-col gap-4">
                            <Text variant='bodyBold' className="text-color-ui-1">Main Pages</Text>
                            <NavLink color="ui-1" href="/">Home</NavLink>
                            <NavLink color="ui-1" href="/about">About</NavLink>
                            <NavLink color="ui-1" href="/contact">Contact</NavLink>
                            <NavLink color="ui-1" href="/blog">Blog</NavLink>
                            <NavLink color="ui-1" href="/properties">Properties</NavLink>
                        </div>
                        <div className="flex flex-col gap-4">
                            <Text variant='bodyBold' className="text-color-ui-1">Other Pages</Text>
                            <NavLink color="ui-1" href="/property">Property</NavLink>
                            <NavLink color="ui-1" href="/broker">Broker</NavLink>
                            <NavLink color="ui-1" href="/privacy-policy">Privacy Policy</NavLink>
                            <NavLink color="ui-1" href="/404">404</NavLink>
                        </div>
                        <div className="flex flex-col gap-4">
                            <Text variant='bodyBold' className="text-color-ui-1">Follow Us</Text>
                            <NavLink color="ui-1" href="https://www.linkedin.com/company/luxuria/" target="_blank">Linkedin</NavLink>
                            <NavLink color="ui-1" href="https://www.instagram.com/luxuria/" target="_blank">Instagram</NavLink>
                            <NavLink color="ui-1" href="https://www.twitter.com/luxuria/" target="_blank">Twitter</NavLink>
                            <NavLink color="ui-1" href="https://www.youtube.com/luxuria/" target="_blank">Youtube</NavLink>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between py-6 flex-col items-center gap-6 md:flex-row md:justify-between md:gap-0">
                    <div className="flex">
                        <Text variant='bodyMedium' className="text-color-ui-2">Copyright © All rights reserved</Text>
                        <DotIcon size={24} />
                        <NavLink color="ui-2" href="/privacy-policy">Privacy Policy</NavLink>
                    </div>
                    <div className="flex gap-2">
                        <Text variant='bodyMedium' className="text-color-ui-2">Powered by</Text>
                        <NavLink color="ui-2" href="https://afifistudio.com" target="_blank">AfifiStudio</NavLink>
                    </div>
                </div>
            </div>
        </footer>
    );
}
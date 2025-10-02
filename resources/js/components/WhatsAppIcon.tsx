import { WhatsappLogoIcon } from "@phosphor-icons/react";

export default function WhatsAppIcon({ href }: { href: string }) {

    return (
        <a href={href} target="_blank" className="group fixed bottom-6 right-6 z-55 bg-green-500 hover:bg-green-700 transition-colors duration-300 rounded-full shadow-md overflow-hidden cursor-pointer p-2">
            <WhatsappLogoIcon size={40} className="text-ui-1 group-hover:text-ui-2 transition-colors duration-300" />
        </a>
    )
}
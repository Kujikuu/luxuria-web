import * as PhosphorIcons from "@phosphor-icons/react";

export default function SocialIcon({ iconName, href }: { iconName: string, href: string }) {

    const IconComponent = (PhosphorIcons as any)[iconName] || PhosphorIcons.BuildingIcon;

    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="flex overflow-hidden cursor-pointer">
            <IconComponent size={24} className="text-text-primary" />
        </a>
    );
}
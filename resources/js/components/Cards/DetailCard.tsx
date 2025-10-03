import * as PhosphorIcons from "@phosphor-icons/react";
import { Text } from "../Typography";

export default function DetailCard({ iconName, title, description }: { iconName: string, title: string, description: string }) {
    // Dynamically get the icon component based on iconName
    const IconComponent = (PhosphorIcons as any)[iconName] || PhosphorIcons.BuildingIcon;
    
    return (
        <div className="flex flex-col gap-6 items-center justify-center">
            <IconComponent size={40} className="text-text-primary" />
            <div className="flex flex-col gap-3 items-center justify-center text-center">
                <Text variant="heading4" className="text-text-primary text-center">{title || "Property Title"}</Text>
                <Text variant="bodyLong" className="text-text-secondary text-center max-w-2xs">{description || "Detailed description of the property goes here."}</Text>
            </div>
        </div>
    );
}
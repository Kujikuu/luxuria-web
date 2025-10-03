import * as PhosphorIcons from "@phosphor-icons/react";
import { Text } from "../Typography";

export default function FeatureCard({ iconName, title, description }: { iconName: string, title: string, description: string }) {
    const IconComponent = (PhosphorIcons as any)[iconName] || PhosphorIcons.BuildingIcon;

    return (
        <div className="flex flex-col gap-6 w-[374px] h-full px-6 py-11 bg-ui-1 border border-ui-3 rounded-2xl">
            <div className="bg-primary p-2 rounded-lg items-center justify-center flex w-max">
                <IconComponent size={36} className="text-ui-1" />
            </div>
            <div className="flex flex-col gap-3">
                <Text variant="heading4" className="text-text-primary">{title || "Property Title"}</Text>
                <Text variant="bodyLong" className="text-text-secondary">{description || "Detailed description of the property goes here."}</Text>
            </div>
        </div>
    );
}
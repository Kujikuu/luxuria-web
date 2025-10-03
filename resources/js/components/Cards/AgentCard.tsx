import { Link } from "@inertiajs/react";
import { Text } from "../Typography";

export default function AgentCard({ img, role, title, href }: { img?: string, role?: string, title?: string, href: string }) {
    return (
        <Link href={href}>
            <div className="flex flex-col gap-6 pb-6 bg-ui-2 border-ui-3 md:bg-ui-2/0 border md:border-ui-3/0 rounded-2xl overflow-hidden group hover:bg-ui-2 hover:border-ui-3 transition-colors duration-400">
                <div className="flex w-full h-[300px] rounded-2xl shadow-md overflow-hidden">
                    <img src={img || "https://placehold.co/150"} alt="Blog Image" className="object-cover w-full h-full md:group-hover:scale-105 transition-transform duration-400" />
                </div>

                <div className="flex flex-col gap-3 px-6 md:group-hover:px-6 transition-padding duration-400">
                    <Text variant="heading4" className="text-text-primary">{title || "High-End Properties"}</Text>
                    <Text variant="bodyMedium" className="text-text-secondary">{role}</Text>
                </div>
            </div>
        </Link>
    );
}
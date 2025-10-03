import { Link } from "@inertiajs/react";
import { Text } from "../Typography";

function BlogCardLarge({ img, date, title, description, author, authorImage, authorRole, href }: { img?: string, date?: string, title?: string, description?: string, author?: string, authorImage?: string, authorRole?: string, href: string }) {
    return (
        <Link href={href}>
            <div className="flex flex-col md:flex-row gap-3 w-80 lg:w-6xl md:w-3xl bg-ui-2 border border-ui-3 rounded-2xl overflow-hidden group">
                <div className="flex w-full h-[320px] md:h-[460px] shadow-md overflow-hidden">
                    <img src={img || "https://placehold.co/150"} alt="Blog Image" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-400" />
                </div>

                <div className="flex flex-col w-full md:justify-between gap-6 p-4 md:p-6 overflow-hidden">
                    <div className="flex flex-col gap-6 overflow-hidden">
                        <div className="flex bg-text-primary py-[7px] px-[16px] w-max rounded-full text-ui-1">
                            <Text variant="bodySmall" className="text-ui-1" as="p">{date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Text variant="heading3" className="text-text-primary">{title || "High-End Properties"}</Text>
                            <Text variant="bodyLarge" className="text-text-secondary">{description || "Luxury homebuyers and sellers are navigating changing market conditions"}</Text>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 overflow-hidden">
                        <img src={authorImage || "https://placehold.co/40"} alt="Author Avatar" className="w-9 h-9 rounded-full object-cover" />
                        <div className="flex flex-col">
                            <Text variant="bodyMedium" className="text-text-primary">{author || "Yousif Al Harbi"}</Text>
                            <Text variant="bodySmall" className="text-text-secondary">{authorRole || "CEO & Founder"}</Text>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

function BlogCardMedium({ img, date, title, href }: { img?: string, date?: string, title?: string, href: string }) {
    return (
        <Link href={href}>
            <div className="flex flex-col gap-6 pb-6 bg-ui-2 border-ui-3 md:bg-ui-2/0 border md:border-ui-3/0 rounded-2xl overflow-hidden group hover:bg-ui-2 hover:border-ui-3 transition-colors duration-400">
                <div className="flex w-full h-[300px] rounded-2xl shadow-md overflow-hidden">
                    <img src={img || "https://placehold.co/150"} alt="Blog Image" className="object-cover w-full h-full md:group-hover:scale-105 transition-transform duration-400" />
                </div>

                <div className="flex flex-col gap-3 px-0 md:group-hover:px-6 transition-padding duration-400">
                    <Text variant="heading4" className="text-text-primary">{title || "High-End Properties"}</Text>
                    <Text variant="bodyMedium" className="text-text-secondary">{date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                </div>
            </div>
        </Link>
    );
}

export { BlogCardLarge, BlogCardMedium };
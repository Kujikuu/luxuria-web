import { ReactNode } from "react";
import { Text } from "../Typography";
import { Link } from "@inertiajs/react";

export const NavLink = ({
    children,
    href,
    color = "text-primary"
}: {
    children: ReactNode;
    href: string;
    color?: string;
}) => {
    return (
        <Link href={href} className='group flex flex-col w-max overflow-visible'>
            <Text variant="bodyMedium" color={color}>{children}</Text>
            <div className={`w-[8px] h-[1px] opacity-0 bg-${color} group-hover:w-full group-hover:opacity-100 transition-all duration-300 ease-in-out`}></div>
        </Link>
    );
}
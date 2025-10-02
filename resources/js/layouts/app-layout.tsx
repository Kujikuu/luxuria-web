import AppLayoutTemplate from '@/layouts/app/app-header-layout';
import { ReactNode } from "react";

interface AppLayoutProps {
    children: ReactNode;
    color?: string;
    section?: string;
}

export default ({ children, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate {...props}>
        {children}
    </AppLayoutTemplate>
);
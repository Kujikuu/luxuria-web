import WhatsAppIcon from '@/components/WhatsAppIcon';
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
        <WhatsAppIcon href="https://wa.me/+966555555555" />
    </AppLayoutTemplate>
);
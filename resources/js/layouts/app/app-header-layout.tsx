import Footer from '@/components/Navigation/Footer';
import Header from '@/components/Navigation/Header';
import type { PropsWithChildren } from 'react';

type AppHeaderLayoutProps = PropsWithChildren<{
    color?: string;
    section?: string;
}>;

export default function AppHeaderLayout({
    children,
    color = 'white',
    section = 'nav'
}: AppHeaderLayoutProps) {
    return (
        <main className='flex flex-col items-center'>
            <Header section={section} color={color} />
            {children}
            <Footer />
        </main>
    );
}
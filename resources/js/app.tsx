import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import LenisProvider from './components/LenisProvider';
import RTLProvider from './components/RTLProvider';
import { initializeTranslations } from './hooks/useLocalization';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => title ? `${title} - ${appName}` : appName,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Initialize translations for the current locale
        const locale = (props.initialPage?.props as any)?.locale?.current || 'en';
        initializeTranslations(locale);

        root.render(
            <RTLProvider locale={locale}>
                <LenisProvider
                    scrollSpeed="normal"
                // You can also pass custom options to override the preset:
                // options={{ duration: 1.2, mouseMultiplier: 0.8 }}
                >
                    <App {...props} />
                </LenisProvider>
            </RTLProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

export interface Auth {
    user: User;
}

export interface Locale {
    current: string;
    available: string[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    locale: Locale;
    translations?: {
        [namespace: string]: {
            [key: string]: string;
        };
    };
    [key: string]: unknown;
}

export interface PageProps extends SharedData {
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

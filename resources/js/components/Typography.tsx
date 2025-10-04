import { JSX, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

type TextVariant =
    | "heading1"
    | "heading2"
    | "heading3"
    | "heading4"
    | "bodyLarge"
    | "bodyLight"
    | "bodyBold"
    | "bodyMedium"
    | "bodyLong"
    | "bodySmall"
    | "bodySmallBold";

interface TextProps {
    children: ReactNode;
    variant: TextVariant;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
}

interface VariantConfig {
    sizes: { lg: number; md: number; sm: number };
    weight: string;
    leading: string;
    extras?: string;
}

// Move variant configs outside component to prevent recreation on each render
const VARIANT_CONFIGS: Record<TextVariant, VariantConfig> = {
    heading1: {
        sizes: { lg: 66, md: 60, sm: 40 },
        weight: "font-semibold",
        leading: "leading-tight"
    },
    heading2: {
        sizes: { lg: 52, md: 42, sm: 28 },
        weight: "font-semibold",
        leading: "leading-tight"
    },
    heading3: {
        sizes: { lg: 32, md: 24, sm: 20 },
        weight: "font-semibold",
        leading: "leading-tight"
    },
    heading4: {
        sizes: { lg: 22, md: 20, sm: 20 },
        weight: "font-semibold",
        leading: "leading-tight"
    },
    bodyLarge: {
        sizes: { lg: 18, md: 18, sm: 16 },
        weight: "font-medium",
        leading: "leading-snug"
    },
    bodyLight: {
        sizes: { lg: 18, md: 16, sm: 16 },
        weight: "font-light",
        leading: "leading-snug"
    },
    bodyBold: {
        sizes: { lg: 18, md: 16, sm: 16 },
        weight: "font-semibold",
        leading: "leading-normal"
    },
    bodyMedium: {
        sizes: { lg: 18, md: 16, sm: 16 },
        weight: "font-medium",
        leading: "leading-snug"
    },
    bodyLong: {
        sizes: { lg: 18, md: 16, sm: 16 },
        weight: "font-normal",
        leading: "leading-relaxed"
    },
    bodySmall: {
        sizes: { lg: 14, md: 14, sm: 14 },
        weight: "font-normal",
        leading: "leading-snug"
    },
    bodySmallBold: {
        sizes: { lg: 14, md: 14, sm: 14 },
        weight: "font-semibold",
        leading: "leading-snug"
    },
} as const;

const VARIANT_TO_ELEMENT: Record<string, keyof JSX.IntrinsicElements> = {
    heading1: "h1",
    heading2: "h2",
    heading3: "h3",
    heading4: "h4",
} as const;

const Text = forwardRef<HTMLElement, TextProps>(
    ({ children, variant, className, as }, ref) => {
        const config = VARIANT_CONFIGS[variant];
        const defaultColor = variant === "bodyLight" ? "text-muted-foreground" : "text-foreground";

        const Element = as || (VARIANT_TO_ELEMENT[variant] as keyof JSX.IntrinsicElements) || "p";

        const variantClasses = cn(
            // Responsive font sizes using CSS custom properties
            "text-[length:var(--font-size-sm)] md:text-[length:var(--font-size-md)] lg:text-[length:var(--font-size-lg)]",
            config.weight,
            config.leading,
            defaultColor,
            config.extras,
            className
        );

        const style = {
            '--font-size-sm': `${config.sizes.sm}px`,
            '--font-size-md': `${config.sizes.md}px`,
            '--font-size-lg': `${config.sizes.lg}px`,
            fontFeatureSettings: '"blwf" 1, "salt" 1, "ss01" 1, "ss07" 1',
        } as React.CSSProperties;

        return (
            <Element ref={ref} className={variantClasses} style={style}>
                {children}
            </Element>
        );
    }
);

Text.displayName = "Text";

export { Text };
export type { TextProps, TextVariant };
import { JSX, ReactNode } from "react";

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
    color?: string;
}

interface VariantConfig {
    sizes: { lg: number; md: number; sm: number };
    weight: string;
    leading: string;
    extras?: string;
}

const Text = ({ children, variant, className, color }: TextProps) => {
    const getVariantStyles = (variant: TextVariant, color?: string) => {
        const defaultColor = variant === "bodyLight" ? "text-secondary" : "text-primary";
        const textColor = color || defaultColor;

        const variantConfigs: Record<TextVariant, VariantConfig> = {
            heading1: { sizes: { lg: 66, md: 64, sm: 50 }, weight: "font-semibold", leading: "leading-tight" },
            heading2: { sizes: { lg: 42, md: 40, sm: 30 }, weight: "font-medium", leading: "leading-tight" },
            heading3: { sizes: { lg: 32, md: 24, sm: 18 }, weight: "font-medium", leading: "leading-tight" },
            heading4: { sizes: { lg: 22, md: 20, sm: 18 }, weight: "font-medium", leading: "leading-tight" },
            bodyLarge: { sizes: { lg: 18, md: 18, sm: 16 }, weight: "font-medium", leading: "leading-snug" },
            bodyLight: { sizes: { lg: 18, md: 16, sm: 16 }, weight: "font-medium", leading: "leading-snug" },
            bodyBold: { sizes: { lg: 18, md: 16, sm: 16 }, weight: "font-medium", leading: "leading-tight" },
            bodyMedium: { sizes: { lg: 18, md: 16, sm: 16 }, weight: "font-medium", leading: "leading-snug" },
            bodyLong: { sizes: { lg: 18, md: 16, sm: 16 }, weight: "font-medium", leading: "leading-relaxed" },
            bodySmall: { sizes: { lg: 14, md: 14, sm: 14 }, weight: "font-medium", leading: "leading-snug", extras: "font-stretch-semi-condensed" },
            bodySmallBold: { sizes: { lg: 14, md: 14, sm: 14 }, weight: "font-medium", leading: "leading-snug", extras: "font-stretch-semi-condensed" },
        };

        const config = variantConfigs[variant];
        const sizeClasses = `lg:text-[${config.sizes.lg}px] md:text-[${config.sizes.md}px] sm:text-[${config.sizes.sm}px]`;
        const extras = config.extras ? ` ${config.extras}` : "";
        
        return `${sizeClasses} ${config.weight} text-${textColor} ${config.leading}${extras}`;
    };

    const variantToElement: Record<string, keyof JSX.IntrinsicElements> = {
        heading1: "h1",
        heading2: "h2",
        heading3: "h3",
        heading4: "h4",
    };

    const Element = (variantToElement[variant] || "p") as keyof JSX.IntrinsicElements;
    const variantStyles = getVariantStyles(variant, color);
    const combinedClassName = `${variantStyles} ${className ?? ''}`;

    return <Element className={combinedClassName}>{children}</Element>;
};

// Backward compatibility exports
interface ComponentProps {
    children: ReactNode;
    className?: string;
    color?: string;
}

const createTextComponent = (variant: TextVariant, defaultColor = "text-primary") => 
    ({ children, className, color = defaultColor }: ComponentProps) => (
        <Text variant={variant} className={className} color={color}>{children}</Text>
    );

const Heading1 = createTextComponent("heading1");
const Heading2 = createTextComponent("heading2");
const Heading3 = createTextComponent("heading3");
const Heading4 = createTextComponent("heading4");
const BodyLarge = createTextComponent("bodyLarge");
const BodyLight = createTextComponent("bodyLight", "text-secondary");
const BodyBold = createTextComponent("bodyBold");
const BodyMedium = createTextComponent("bodyMedium");
const BodyLong = createTextComponent("bodyLong");
const BodySmall = createTextComponent("bodySmall");
const BodySmallBold = createTextComponent("bodySmallBold");

export { Text, Heading1, Heading2, Heading3, Heading4, BodyLarge, BodyLight, BodyBold, BodyMedium, BodyLong, BodySmall, BodySmallBold }
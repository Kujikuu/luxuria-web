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

const Text = ({ children, variant, className, color }: TextProps) => {
    const getVariantStyles = (variant: TextVariant, color?: string) => {
        const defaultColor = variant === "bodyLight" ? "text-secondary" : "text-primary";
        const textColor = color || defaultColor;

        const variants = {
            heading1: `text-6xl font-semibold text-${textColor} leading-tight`,
            heading2: `text-5xl font-medium text-${textColor} leading-tight`,
            heading3: `text-4xl font-medium text-${textColor} leading-tight`,
            heading4: `text-2xl font-medium text-${textColor} leading-tight`,
            bodyLarge: `text-lg text-${textColor} leading-snug`,
            bodyLight: `text-lg text-${textColor} leading-snug`,
            bodyBold: `text-lg font-medium text-${textColor} leading-tight`,
            bodyMedium: `text-base text-${textColor} leading-snug`,
            bodyLong: `text-base text-${textColor} leading-relaxed`,
            bodySmall: `text-sm text-${textColor} leading-snug font-stretch-semi-condensed`,
            bodySmallBold: `text-sm font-medium text-${textColor} leading-snug font-stretch-semi-condensed`,
        };

        return variants[variant];
    };

    const getElement = (variant: TextVariant) => {
        switch (variant) {
            case "heading1":
                return "h1";
            case "heading2":
                return "h2";
            case "heading3":
                return "h3";
            case "heading4":
                return "h4";
            default:
                return "p";
        }
    };

    const Element = getElement(variant) as keyof JSX.IntrinsicElements;
    const variantStyles = getVariantStyles(variant, color);
    const combinedClassName = `${variantStyles} ${className ?? ''}`;

    return <Element className={combinedClassName}>{children}</Element>;
};

// Backward compatibility exports
const Heading1 = ({ children, className, color = "text-primary" }: { children: ReactNode; className?: string; color?: string }) => (
    <Text variant="heading1" className={className} color={color}>{children}</Text>
);

const Heading2 = ({ children, className, color = "text-primary" }: { children: ReactNode; className?: string; color?: string }) => (
    <Text variant="heading2" className={className} color={color}>{children}</Text>
);

const Heading3 = ({ children, className, color = "text-primary" }: { children: ReactNode; className?: string; color?: string }) => (
    <Text variant="heading3" className={className} color={color}>{children}</Text>
);

const Heading4 = ({ children, className, color = "text-primary" }: { children: ReactNode; className?: string; color?: string }) => (
    <Text variant="heading4" className={className} color={color}>{children}</Text>
);

const BodyLarge = ({ children, className, color = "text-primary" }: { children: ReactNode; className?: string; color?: string }) => (
    <Text variant="bodyLarge" className={className} color={color}>{children}</Text>
);

const BodyLight = ({ children, className, color = "text-secondary" }: { children: ReactNode; className?: string; color?: string }) => (
    <Text variant="bodyLight" className={className} color={color}>{children}</Text>
);

const BodyBold = ({ children, className, color = "text-primary" }: { children: ReactNode; className?: string; color?: string }) => (
    <Text variant="bodyBold" className={className} color={color}>{children}</Text>
);

const BodyMedium = ({ children, className, color = "text-primary" }: { children: ReactNode; className?: string; color?: string }) => (
    <Text variant="bodyMedium" className={className} color={color}>{children}</Text>
);

const BodyLong = ({ children, className, color = "text-primary" }: { children: ReactNode; className?: string; color?: string }) => (
    <Text variant="bodyLong" className={className} color={color}>{children}</Text>
);

const BodySmall = ({ children, className, color = "text-primary" }: { children: ReactNode; className?: string; color?: string }) => (
    <Text variant="bodySmall" className={className} color={color}>{children}</Text>
);

const BodySmallBold = ({ children, className, color = "text-primary" }: { children: ReactNode; className?: string; color?: string }) => (
    <Text variant="bodySmallBold" className={className} color={color}>{children}</Text>
);

export { Text, Heading1, Heading2, Heading3, Heading4, BodyLarge, BodyLight, BodyBold, BodyMedium, BodyLong, BodySmall, BodySmallBold }
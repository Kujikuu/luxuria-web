import { Text } from "./Typography";

interface TagProps {
    text: string;
    variant?: "primary" | "secondary";
}

export default function Tag({ text, variant = "primary" }: TagProps) {
    return (
        <div className={`flex items-center justify-center px-3 py-1.5 bg-${variant === "primary" ? "primary" : "ui-2"} rounded-2xl w-max`}>
            <Text variant="bodySmall" className={`text-${variant === "primary" ? "ui-1" : "primary"} text-center`}>{text}</Text>
        </div>
    );
}
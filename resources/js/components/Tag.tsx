import { Text } from "./Typography";

interface TagProps {
    text: string;
}

export default function Tag({ text }: TagProps) {
    return (
        <div className="flex items-center justify-center px-3 py-1.5 bg-primary rounded-2xl w-max">
            <Text variant="bodySmall" className="text-ui-1 text-center">{text}</Text>
        </div>
    );
}
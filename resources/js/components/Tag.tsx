import { Text } from './Typography';

interface TagProps {
    text: string;
    variant?: 'primary' | 'secondary';
}

export default function Tag({ text, variant = 'primary' }: TagProps) {
    const styles = {
        primary: {
            container: 'bg-primary',
            text: 'text-ui-1',
        },
        secondary: {
            container: 'bg-primary-soft ring-1 ring-primary/15',
            text: 'text-primary-deep',
        },
    }[variant];

    return (
        <div className={`flex w-max items-center justify-center rounded-2xl px-3 py-1.5 ${styles.container}`}>
            <Text variant="bodySmall" className={`${styles.text} text-center`}>
                {text}
            </Text>
        </div>
    );
}

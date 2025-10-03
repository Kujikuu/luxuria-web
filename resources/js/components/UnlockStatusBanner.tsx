import { StarIcon } from "@phosphor-icons/react";
import { Text } from "@/components/Typography";
import { usePropertiesUnlock } from "@/hooks/usePropertiesUnlock";

interface UnlockStatusBannerProps {
    compact?: boolean;
    className?: string;
}

export default function UnlockStatusBanner({ compact = false, className = "" }: UnlockStatusBannerProps) {
    const { isUnlocked, getRemainingDays } = usePropertiesUnlock();

    if (!isUnlocked) return null;

    if (compact) {
        return (
            <div className={`flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full ${className}`}>
                <StarIcon size={14} className="text-green-600" />
                <Text variant="bodySmall" className="text-green-800 font-medium">
                    Premium ({getRemainingDays()}d left)
                </Text>
            </div>
        );
    }

    return (
        <div className={`flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl ${className}`}>
            <StarIcon size={20} className="text-green-600" />
            <Text variant="bodyLarge" className="text-green-800 font-medium">
                🎉 Premium Access Active - All property details unlocked
            </Text>
            <Text variant="bodyMedium" className="text-green-600">
                ({getRemainingDays()} days remaining)
            </Text>
        </div>
    );
}
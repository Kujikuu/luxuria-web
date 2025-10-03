import { useState, useEffect } from 'react';

interface UnlockData {
    unlocked: boolean;
    timestamp: string;
    user: {
        name: string;
        phone: string;
        email: string | null;
    };
    property_id: number;
}

export const usePropertiesUnlock = () => {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [unlockData, setUnlockData] = useState<UnlockData | null>(null);

    useEffect(() => {
        checkUnlockStatus();
    }, []);

    const checkUnlockStatus = () => {
        try {
            const storedData = localStorage.getItem('luxuria_properties_unlocked');
            if (storedData) {
                const parsedData: UnlockData = JSON.parse(storedData);
                
                // Check if unlock is still valid (30 days)
                const unlockDate = new Date(parsedData.timestamp);
                const now = new Date();
                const daysDiff = Math.floor((now.getTime() - unlockDate.getTime()) / (1000 * 60 * 60 * 24));
                
                if (daysDiff <= 30) {
                    setIsUnlocked(true);
                    setUnlockData(parsedData);
                } else {
                    // Remove expired unlock data
                    localStorage.removeItem('luxuria_properties_unlocked');
                    setIsUnlocked(false);
                    setUnlockData(null);
                }
            }
        } catch (error) {
            console.error('Error checking unlock status:', error);
            localStorage.removeItem('luxuria_properties_unlocked');
            setIsUnlocked(false);
            setUnlockData(null);
        }
    };

    const saveUnlockStatus = (userData: { name: string; phone: string; email?: string }, propertyId: number) => {
        const unlockData: UnlockData = {
            unlocked: true,
            timestamp: new Date().toISOString(),
            user: {
                name: userData.name,
                phone: userData.phone,
                email: userData.email || null,
            },
            property_id: propertyId,
        };
        
        try {
            localStorage.setItem('luxuria_properties_unlocked', JSON.stringify(unlockData));
            setIsUnlocked(true);
            setUnlockData(unlockData);
            return true;
        } catch (error) {
            console.error('Error saving unlock status:', error);
            return false;
        }
    };

    const clearUnlockStatus = () => {
        try {
            localStorage.removeItem('luxuria_properties_unlocked');
            setIsUnlocked(false);
            setUnlockData(null);
        } catch (error) {
            console.error('Error clearing unlock status:', error);
        }
    };

    const getRemainingDays = (): number => {
        if (!unlockData) return 0;
        
        const unlockDate = new Date(unlockData.timestamp);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - unlockDate.getTime()) / (1000 * 60 * 60 * 24));
        
        return Math.max(0, 30 - daysDiff);
    };

    return {
        isUnlocked,
        unlockData,
        saveUnlockStatus,
        clearUnlockStatus,
        checkUnlockStatus,
        getRemainingDays,
    };
};
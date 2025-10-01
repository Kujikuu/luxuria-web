import { Head } from '@inertiajs/react';
import { Text } from '@/components/Typography';
import { NavLink } from '@/components/Navigation/NavLink';
import PhoneMenu from '@/components/Navigation/PhoneMenu';



export default function Welcome() {
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600" rel="stylesheet" />
            </Head>
            <div className="container mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <Text variant="heading1">Main Title</Text>
                    <Text variant="bodyMedium" color="text-blue-500">Some content</Text>
                    <Text variant="bodySmall" className="mb-4">Small text with margin</Text>
                    <div className='flex items-center justify-center gap-6'>
                        <NavLink color='primary' href="/">Home</NavLink>
                        <NavLink color='primary' href="/">About</NavLink>
                        <PhoneMenu color='primary' />
                    </div>
                </div>
            </div>
        </>
    );
}

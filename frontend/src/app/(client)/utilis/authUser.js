// src/utils/authUser.js

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
    const router = useRouter();

    useEffect(() => {
        const cookieStore = cookies()
        const token = cookieStore.get('token');

        if (!token) {
            router.push('/login');
        }
    }, [router]);

    return null; // This hook doesn't render anything; it's only for route protection
};

export default useAuth;





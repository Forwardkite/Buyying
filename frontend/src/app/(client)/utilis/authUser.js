import { useEffect } from 'react';
import Cookies from 'js-cookie'; // Import the library directly
import { useRouter } from 'next/navigation'; // Correct import path

const useAuth = () => {
    const router = useRouter();

    useEffect(() => {
        // Don't call Cookies() as a function
        // const tokens = Cookies.get('token');
        const cookie = document.cookie;

        if (!cookie) {
            router.push('/login');
        }
    }, [router]);

    return null;
};

export default useAuth;






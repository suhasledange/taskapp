'use client'
import { useTodoContext } from '@/context/TodoProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useSyncLogout = () => {
    const router = useRouter();

    const {setTodoData,setUserData} = useTodoContext()

    useEffect(() => {
        const syncLogout = (event) => {
            if (event.key === 'logout') {
                router.replace('/');
                setTodoData([]);
                setUserData([]);
            }
        };

        window.addEventListener('storage', syncLogout);

        return () => {
            window.removeEventListener('storage', syncLogout);
        };
    }, [router]);
};

export default useSyncLogout;

'use client';

import { useHistoryContext } from '@/ui-system/components/history-provider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const useDisplayRecentHistory = () => {
    // const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const { history, updateHistory } = useHistoryContext();


    useEffect(() => {
        const currentUrl = `${pathname}?${searchParams}`

        console.log('history', history);


        const addNewRouteToHistory = (url: string) => {
            updateHistory(url);
        }

        // router.events.on('routeChangeComplete', () =>
        // );

        // addNewRouteToHistory(currentUrl)

    }, [pathname, searchParams, updateHistory]);
}

export default useDisplayRecentHistory;
import AppLayout from '@/components/AppLayout';
import CoinGrid from '@/components/coinGrid';
import Head from 'next/head';
import React from 'react';

const cashcow = () => {
    return (

        <AppLayout>
            <Head>
                <title>CoinList | CashCow</title>
            </Head>
        <div>
            비교 LIST
            <CoinGrid />
        </div>
        </AppLayout>
    );
};

export default cashcow;
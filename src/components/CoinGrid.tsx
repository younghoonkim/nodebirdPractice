import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { render } from 'react-dom';
import { NextPage } from 'next';

// interface CoinEntity {
//     Coin: string,
//     Data: CoinData[]
// }
// interface CoinData{
//     TradeCenter: string,
//     price: number
// }

interface CoinEntity{
    Coin: string,
    BithumbPrice: number,
    UpbitPrice: number,
    BinancePrice: number
}

const CoinGrid = () => {
    // const [coinList] = React.useState<CoinEntity[]>([
    //     {Coin: 'BTC', Data: [{TradeCenter: 'BITHUMB', price: 500},{TradeCenter: 'UPBIT', price: 550},{TradeCenter: 'BINANCE', price: 600} ]},
    //     {Coin: 'ETH', Data: [{TradeCenter: 'BITHUMB', price: 100},{TradeCenter: 'UPBIT', price: 50},{TradeCenter: 'BINANCE', price: 10} ]},
    //     {Coin: 'STX', Data: [{TradeCenter: 'BITHUMB', price: 3},{TradeCenter: 'UPBIT', price: 5},{TradeCenter: 'BINANCE', price: 8} ]},
    // ]);

    const [coinList] = React.useState<CoinEntity[]>([
        {Coin: 'BTC', BithumbPrice: 500, UpbitPrice: 550, BinancePrice: 600},
        {Coin: 'ETH', BithumbPrice: 100, UpbitPrice: 50, BinancePrice: 10},
        {Coin: 'STX', BithumbPrice: 3, UpbitPrice: 5, BinancePrice: 8},
        {Coin: 'SBX', BithumbPrice: 31, UpbitPrice: 55, BinancePrice: 83},
    ]);

    const [columnDefs] = React.useState([
        { field: 'Coin' },
        { field: 'BithumbPrice' },
        { field: 'UpbitPrice' },
        { field: 'BinancePrice' },
    ]);

    return <></>;
};

export default CoinGrid;
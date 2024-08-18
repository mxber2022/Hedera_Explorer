"use client"

import { useEffect, useState } from "react";
import "./HederaData.css";

interface PriceInfo {
    price: string;
    conf: string;
    expo: number;
    publish_time: number;
}

interface EmaPriceInfo {
    price: string;
    conf: string;
    expo: number;
    publish_time: number;
}

interface Metadata {
    slot: number;
    proof_available_time: number;
    prev_publish_time: number;
}

interface ParsedData {
    id: string;
    price: PriceInfo;
    ema_price: EmaPriceInfo;
    metadata: Metadata;
}

interface HBARStatistics {
    parsed: ParsedData[];
}

interface SupplyData {
    released_supply: string;
    timestamp: string;
    total_supply: string;
}

function HederaData() {
    const [HBARstatistics, setHBARstatistics] = useState<HBARStatistics | null>(null);
    const [supplyData, setSupplyData] = useState<SupplyData | null>(null);

    async function fetchHBARstatistics() {
        try {
            const response = await fetch('https://hermes.pyth.network/v2/updates/price/latest?ids%5B%5D=0x3728e591097635310e6341af53db8b7ee42da9b3a8d918f9463ce9cca886dfbd');
            const data: HBARStatistics = await response.json();
            setHBARstatistics(data);
        } catch (error) {
            console.error("Error fetching HBAR statistics:", error);
        }
    }

    async function fetchSupplyData() {
        try {
            const response = await fetch('https://mainnet-public.mirrornode.hedera.com/api/v1/network/supply');
            const data: SupplyData = await response.json();
            setSupplyData(data);
        } catch (error) {
            console.error("Error fetching supply data:", error);
        }
    }

    useEffect(() => {
        fetchHBARstatistics();
        fetchSupplyData();
    }, []); 
    
    return(  
        <div className="hedera-data">
            <h1>HederaData</h1>
            {HBARstatistics && supplyData ? (
                <div>
                    <h2>Latest HBAR Price</h2>
                    <p>
                        Price: {parseFloat(HBARstatistics.parsed[0].price.price) * Math.pow(10, HBARstatistics.parsed[0].price.expo)} USD
                    </p>
                    <p>
                        EMA Price: {parseFloat(HBARstatistics.parsed[0].ema_price.price) * Math.pow(10, HBARstatistics.parsed[0].ema_price.expo)} USD
                    </p>
                    <p>
                        Market Cap: {(parseFloat(HBARstatistics.parsed[0].price.price) * Math.pow(10, HBARstatistics.parsed[0].price.expo) * parseFloat(supplyData.released_supply) / Math.pow(10, 8)).toLocaleString()} USD
                    </p>
                    <p>
                        Circulating Supply: {(parseFloat(supplyData.released_supply) / Math.pow(10, 8)).toLocaleString()} HBAR
                    </p>
                    <p>
                        Publish Time: {new Date(HBARstatistics.parsed[0].price.publish_time * 1000).toLocaleString()}
                    </p>
                </div>
            ) : (
                <p>Loading HBAR statistics...</p>
            )}
        </div>  
    );
}

export default HederaData;

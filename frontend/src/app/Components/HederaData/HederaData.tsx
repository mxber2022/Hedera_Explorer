"use client"
import "./HederaData.css";
import { useEffect, useState } from "react";

function HederaData() {

    const [HBARstatistics, setHBARstatistics] = useState(null);

    async function fetchHBARstatistics() {
        
        const response = await fetch(`https://pro-api.coinmarketcap.com/v1/blockchain/statistics/latest?symbol=HBAR`, // Replace with actual API endpoint
          {
            //@ts-ignore
            headers: {
              'X-CMC_PRO_API_KEY': process.env.NEXT_PUBLIC_CMC,
              'Content-Type': 'application/json'
            },
          }
        );
      
        if (!response.ok) {
            console.log(process.env.NEXT_PUBLIC_CMC);
          throw new Error('Failed to fetch blockchain statistics');
        }
      
        const data = await response.json();
        setHBARstatistics(data);
        return data;
    }

    useEffect(() => {
        fetchHBARstatistics();
    }, []); 
    
    return(  
        <>
            <div className="">
            HederaData
            </div>  
            {HBARstatistics}
        </>
    )
}

export default HederaData;

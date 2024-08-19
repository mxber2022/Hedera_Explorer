"use client"
import { useState, useEffect } from 'react';
import "./LatestTransaction.css";
import { useNetwork } from '../NetworkContext/NetworkContext';

function LatestTransaction() {
    // State to store transaction data
    const [transactionData, setTransactionData] = useState(null);
    const { isMainnet, toggleNetwork, apiEndpoint } = useNetwork();
    // Function to fetch account information
    async function fetchAccountInfo() {
        try {
            const response = await fetch(`${apiEndpoint}/api/v1/transactions`, {
                method: 'GET',
                headers: {},
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTransactionData(data);
        } catch (error) {
            console.error('Error fetching account info:', error);
        }
    }

    useEffect(() => {
        fetchAccountInfo();
    }, [apiEndpoint]); 

    const extractFields = (data :any) => {
        if (!data || !data.transactions || data.transactions.length === 0) return [];
        //@ts-ignore
        return data.transactions.map(tx=> ({
            entity_id: tx.entity_id || 'N/A',
            name: tx.name || 'N/A',
            transaction_id: tx.transaction_id || 'N/A',
            node: tx.node || 'N/A',
            result: tx.result || 'N/A'
        }));
    };

    // Render extracted data
    const fields = extractFields(transactionData);
    console.log(transactionData);

    return (
        <section className="LatestTransaction"> 
            <div className='LatestTransaction__container'>
                <h2>Latest Transactions</h2>
                <div className='lt__lists'>
                    <span>Entity ID</span>
                    <span>Name</span>
                    <span>Node</span>
                    {/* <span>Result</span> */}
                    <span>Transaction ID</span>

                </div>
                {fields.length > 0 ? (
                    <ul className="transaction-list">
                        {fields.map((tx :any, index: any) => (
                            <li key={index} className="transaction-item">
                                <div className="transaction-info">
                                    <p>{tx.entity_id}</p>
                                    <p>{tx.name}</p>
                                    <p>{tx.node}</p>
                                    {/* <p>{tx.result}</p> */}
                                    <p>{tx.transaction_id}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading or no data available...</p>
                )}
            </div>
        </section>
    );
}

export default LatestTransaction;

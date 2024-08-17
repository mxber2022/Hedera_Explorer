"use client"
import { useState, useEffect } from 'react';
import "./LatestTransaction.css";

function LatestTransaction() {
    // State to store transaction data
    const [transactionData, setTransactionData] = useState(null);

    // Function to fetch account information
    async function fetchAccountInfo() {
        try {
            const response = await fetch(`https://testnet.mirrornode.hedera.com/api/v1/transactions`, {
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
    }, []); 

    const extractFields = (data :any) => {
        if (!data || !data.transactions || data.transactions.length === 0) return [];
        //@ts-ignore
        return data.transactions.map(tx=> ({
            entity_id: tx.entity_id || 'N/A',
            name: tx.name || 'N/A',
            transaction_id: tx.transaction_id || 'N/A',
            node: tx.node || 'N/A',
        }));
    };

    // Render extracted data
    const fields = extractFields(transactionData);

    return (
        <section className="LatestTransaction">
            <h1>Latest Transactions</h1>
            {fields.length > 0 ? (
                <ul className="transaction-list">
                    {fields.map((tx :any, index: any) => (
                        <li key={index} className="transaction-item">
                            <div className="transaction-info">
                                <p><strong>Entity ID:</strong> {tx.entity_id}</p>
                                <p><strong>Name:</strong> {tx.name}</p>
                                <p><strong>Node:</strong> {tx.node}</p>
                            </div>
                            <p><strong>Transaction ID:</strong> {tx.transaction_id}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading or no data available...</p>
            )}
        </section>
    );
}

export default LatestTransaction;
